import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repositories.js";
import { GetUserUseCase } from "../users/get-user.js"

export function makeGetUserUseCase(){
    
    const usersRepository = new PrismaUsersRepository()
    const getUserUseCase = new GetUserUseCase(usersRepository)

    return getUserUseCase

}