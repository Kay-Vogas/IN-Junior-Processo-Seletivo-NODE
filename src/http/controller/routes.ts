import type { FastifyInstance } from "fastify"
import { userRoutes } from "./users/user.routes.js"
import { moviesRoutes } from "./movies/movies.routes.js"
import { sessionRoutes } from "./sessions/sessions.routes.js"

export async function appRoutes(app : FastifyInstance) {
    app.register(userRoutes,{prefix: '/users'})

    app.register(moviesRoutes,{prefix:'/movies'})

    app.register(sessionRoutes,{prefix:'/sessions'})
}