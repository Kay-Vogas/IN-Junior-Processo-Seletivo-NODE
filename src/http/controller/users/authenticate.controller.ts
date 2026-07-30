import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeAuthenticateUserUseCase } from '@/uses-cases/factories/make-authenticate.js'
import { UserPresenter } from '@/http/presenters/user-presenter.js'
import { InvalidCredencialsError } from '@/uses-cases/error/invalid-crendecials-error.js'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {

    const authenticateBodySchema = z.object({
      username: z.string().trim().min(1).max(100).optional(),
      email: z.email().trim().max(100).optional(),
      password: z.string().min(8),
    })


    const { username, email, password } = authenticateBodySchema.parse(
      request.body,
    )

    
    const authenticateUserUseCase = makeAuthenticateUserUseCase()
    const { user } = await authenticateUserUseCase.execute({
        login: username ?? email!,
        password,
    })
    
    const token = await reply.jwtSign({
        sub: user.publicId,
        role:user.role
    },
    {expiresIn:'1d'},)

    return reply.status(200).send({token,user: UserPresenter.toHTTP(user)})
  
    } catch(error) {

        if(error instanceof InvalidCredencialsError){
            return reply.status(409).send({menssage:error.message})
        }   
        
        throw error
    }

}
