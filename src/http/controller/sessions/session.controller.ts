import { SessionPresenter } from "@/http/presenters/session-presenter.js";
import { makeCreateSessionUseCase } from "@/uses-cases/factories/make-create-session.js";
import type{ FastifyRequest,FastifyReply } from "fastify";
import {z} from 'zod'


export async function createSession(request: FastifyRequest,reply: FastifyReply) {
    try{

        const createSessionParamsSchema = z.object({
            moviePublicId: z.string().uuid(),
        })

        const {moviePublicId} = createSessionParamsSchema.parse(request.params)

        const createSessionBodySchema = z.object({
            startTime:z.coerce.date(),
        })

        const {startTime} = createSessionBodySchema.parse(request.body)
        
        const createSeassionUseCase = makeCreateSessionUseCase()
        const {session} = await createSeassionUseCase.execute({
            startTime,
            moviePublicId,
        })

        return reply.status(201).send({session:SessionPresenter.toHTTP(session)})

    }catch(error){
        
        throw new Error(`Erro ao criar o session, ${error}`) 
    }
}