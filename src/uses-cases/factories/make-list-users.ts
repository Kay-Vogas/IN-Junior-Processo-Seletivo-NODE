import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repositories.js";
import { ListUserUseCase } from "../users/list-users.js";

export function makeListUserUseCase(){
    
    const usersRepository = new PrismaUsersRepository()
    const listUserUseCase = new ListUserUseCase(usersRepository)

    return listUserUseCase

}