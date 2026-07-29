import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repositories.js";
import { RegisterUserUseCase } from "../users/register.js";

export function makeRegisterUseCasa(){
    
    const usersRepository = new PrismaUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(usersRepository)

    return registerUserUseCase

}