import type { FastifyInstance } from "fastify"
import { register } from "./register.controller.js"


export async function moviesRoutes(app: FastifyInstance) {
    app.post('/',register)

}