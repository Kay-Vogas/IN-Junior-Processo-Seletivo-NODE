import type { FastifyInstance } from "fastify"
import { createSession } from "./session.controller.js"


export async function sessionRoutes(app: FastifyInstance) {
    app.post('/:moviePublicId',createSession)

}