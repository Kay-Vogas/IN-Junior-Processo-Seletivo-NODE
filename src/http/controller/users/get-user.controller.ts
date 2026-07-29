import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserUseCase } from '@/uses-cases/factories/make-get-user.js'
import { UserPresenter } from '@/http/presenters/user-presenter.js'
import { ResourceNotFoundError } from '@/uses-cases/error/resource-not-found-error.js'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Usando o Zod para verificar o que usuário estará enviando no objeto
    const getParamsSchema = z.object({
      publicId: z.string()
    })

    // Transforma o body que vem em formato JSON para um objeto, porém com o "getParamsSchema"
    // ele direciona para seu respectivo campo na ordem do objeto, e neste caso puxa o paramâtro da url
    const { publicId } = getParamsSchema.parse(
      request.params
    )

    const getUserUseCase = makeGetUserUseCase()
    const { user } = await getUserUseCase.execute({
      publicId
    })

    return reply.status(200).send(UserPresenter.toHTTP(user))
  
    } catch(error) {

        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({menssage:error.message})
        }   
        
        throw error
    }

}
