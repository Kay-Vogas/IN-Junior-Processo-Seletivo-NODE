import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repositories.js";
import { AuthenticateUserUseCase } from "../users/authenticate.js";

export function makeAuthenticateUserUseCase(){

    const authenticateUserRepository = new PrismaUsersRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(authenticateUserRepository)

    return authenticateUserUseCase
}

