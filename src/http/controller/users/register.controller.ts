import {z} from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply , FastifyRequest } from 'fastify'
import { hash } from 'bcryptjs'
import { env } from '@/env/index.js'

export async function register(request: FastifyRequest,reply: FastifyReply){

    // Usando o Zod para verificar o que usuário estará enviando no objeto
    const registerBodySchema = z.object({
        name:z.string().trim().min(1).max(100),
        username:z.string().trim().min(1).max(100),
        email:z.email().trim().max(100),
        password: z.string().min(8),
    })

    const {name,username,email,password} = registerBodySchema.parse(request.body)


    //Verificação por query , para verificar os Emails e Usernames , pois devem ser unitários
    const userWithSameEmailOrUsername = await prisma.user.findFirst({
        where:{
            OR:[
                {username},
                {email}
            ]  
        }           
    })

    if(userWithSameEmailOrUsername){
        return reply.status(409).send({message: 'Esse Email ou Username já está em uso'})
    }

    //Criptografia da senha enviada pelo user
    const passwordHash = await hash(password,env.HASH_SALT_ROUNDS)

    const user = await prisma.user.create({
        data: {
            name,
            username,
            email,
            passwordHash
        },

    })

    return reply.status(201).send(user)
}