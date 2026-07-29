import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeListUserUseCase } from '@/uses-cases/factories/make-list-users.js'
import { UserPresenter } from '@/http/presenters/user-presenter.js'

export async function list(_request: FastifyRequest, reply: FastifyReply) {
  try {

    const listUserUseCase = makeListUserUseCase()
    const { users } = await listUserUseCase.execute()

    return reply.status(200).send(UserPresenter.toHTTP(users))
  
    } catch(error) { 
        
        throw error
    }

}
