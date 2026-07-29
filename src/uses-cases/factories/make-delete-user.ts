import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repositories.js";
import { DeleteUserUseCase } from "../users/delete-user.js"

export function makeDeleteUserUseCase(){
    
    const usersRepository = new PrismaUsersRepository()
    const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

    return deleteUserUseCase

}