import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from '@/uses-cases/error/user-already-exists-error.js'
import { makeUpdateUserUseCase } from '@/uses-cases/factories/make-update-user.js'
import { UserPresenter } from '@/http/presenters/user-presenter.js'

export async function updateProfile(request: FastifyRequest, reply: FastifyReply) {
  try {

    const {sub:publicId} = request.user as {sub:string}

    const updateBodySchema = z.object({
      name: z.string().trim().min(1).max(100).optional(),
      username: z.string().trim().min(1).max(100).optional(),
      email: z.email().trim().max(100).optional(),
    })

    const { name,username,email } = updateBodySchema.parse(request.body)

    const updateUserUseCase = makeUpdateUserUseCase()
    const { user } = await updateUserUseCase.execute({
        publicId,
        name,
        username,
        email,
    })

    return reply.status(201).send(UserPresenter.toHTTP(user))
  
    } catch(error) {

        if(error instanceof UserAlreadyExistsError){
            return reply.status(409).send({menssage:error.message})
        }   
        
        throw error
    }

}

export async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    
    const updateParamsSchema = z.object({
      publicId: z.string()
    })
    
    const {publicId} = updateParamsSchema.parse(request.params)

    const updateBodySchema = z.object({
      name: z.string().trim().min(1).max(100).optional(),
      username: z.string().trim().min(1).max(100).optional(),
      email: z.email().trim().max(100).optional(),
    })

    const { name,username,email } = updateBodySchema.parse(request.body)

    const updateUserUseCase = makeUpdateUserUseCase()
    const { user } = await updateUserUseCase.execute({
        publicId,
        name,
        username,
        email,
    })

    return reply.status(201).send(UserPresenter.toHTTP(user))
  
    } catch(error) {

        if(error instanceof UserAlreadyExistsError){
            return reply.status(409).send({menssage:error.message})
        }   
        
        throw error
    }

}
