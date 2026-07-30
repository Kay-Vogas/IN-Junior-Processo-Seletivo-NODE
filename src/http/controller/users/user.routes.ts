import type { FastifyInstance } from "fastify"
import { register } from './register.controller.js'
import { get, getProfile } from "./get-user.controller.js"
import { list } from "./list.controller.js"
import { deleteUser, deleteUserProfile } from "./delete-user.controller.js"
import { update, updateProfile } from "./update-user.controller.js"
import { authenticate } from "./authenticate.controller.js"
import { verifyJwt } from "@/http/middlewares/verify-jwt.js"
import { verifyUserRole } from "@/http/middlewares/verify-user-role.js"

export async function userRoutes(app: FastifyInstance) {
    app.post('/',register)
    app.post('/autheticate',authenticate)
    
    app.get('/:publicId',get)
    app.get('/',{onRequest:[verifyJwt,verifyUserRole(['ADMIN','DEFAULT'])]}, list)
    app.delete('/:publicId',deleteUser)
    app.patch('/:publicId',update)

    // USER PROFILE routes
    app.get('/me',{onRequest:[verifyJwt]},getProfile)
    app.patch('/me',{onRequest:[verifyJwt]},updateProfile)
    app.delete('/me',{onRequest:[verifyJwt]},deleteUserProfile)

}
