import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from '@/uses-cases/error/user-already-exists-error.js'
import { makeRegisterUseCasa } from '@/uses-cases/factories/make-register-user-case.js'
import { UserPresenter } from '@/http/presenters/user-presenter.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Usando o Zod para verificar o que usuário estará enviando no objeto
    const registerBodySchema = z.object({
      name: z.string().trim().min(1).max(100),
      username: z.string().trim().min(1).max(100),
      email: z.email().trim().max(100),
      password: z.string().min(8),
    })

    // Transforma o body que vem em formato JSON para um objeto, porém com o "registerBodySchema"
    // ele direciona para seu respectivo campo na ordem do objeto
    const { name, username, email, password } = registerBodySchema.parse(
      request.body,
    )

    const registerUserUseCase = makeRegisterUseCasa()
    const { user } = await registerUserUseCase.execute({
      username,
      email,
      name,
      password,
    })

    return reply.status(201).send(UserPresenter.toHTTP(user))
  
    } catch(error) {

        if(error instanceof UserAlreadyExistsError){
            return reply.status(409).send({menssage:error.message})
        }   
        
        throw error
    }

}
