import fastify from 'fastify'
import {appRoutes} from './http/controller/routes.js' 
import { ZodError } from 'zod'
import fastifyJWT from '@fastify/jwt'
import { env } from './env/index.js'

// instância da aplicação
export const app = fastify()

app.register(fastifyJWT,{
    secret: env.JWT_SECRET
})

app.register(appRoutes)

//Criando um caso de erro global
app.setErrorHandler((error,_request,reply) => {
    
    if(error instanceof ZodError){
        return reply.status(400).send({
            message:'Erro na Validação',
            issues: error.format(),
        })
    }

    if(error instanceof SyntaxError){
        return reply.status(400).send({
            mesagge:'O Corpo da requesição não está em formato JSON válido, verifique a estrutura de dados enviados.'
        })
    }
})