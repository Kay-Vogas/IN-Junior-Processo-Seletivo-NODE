import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeleteUserUseCase } from '@/uses-cases/factories/make-delete-user.js'
import { ResourceNotFoundError } from '@/uses-cases/error/resource-not-found-error.js'

export async function deleteUserProfile(request: FastifyRequest,reply: FastifyReply,) {
  try {
    const { sub: publicId } = request.user as { sub: string }

    const deleteUserUseCase = makeDeleteUserUseCase()
    await deleteUserUseCase.execute({ publicId })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ menssage: error.message })
    }

    throw error
  }
}

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Usando o Zod para verificar o que usuário estará enviando no objeto
    const deleteParamsSchema = z.object({
      publicId: z.string(),
    })

    // Transforma o body que vem em formato JSON para um objeto, porém com o "deleteParamsSchema"
    // ele direciona para seu respectivo campo na ordem do objeto, e neste caso puxa o paramâtro da url
    const { publicId } = deleteParamsSchema.parse(request.params)

    const deleteUserUseCase = makeDeleteUserUseCase()
    await deleteUserUseCase.execute({ publicId })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ menssage: error.message })
    }

    throw error
  }
}
