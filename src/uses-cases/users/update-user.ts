import type { User } from "@/@types/prisma/client.js"
import type { UsersRepository } from "@/repositories/users-repositories.js"
import { UserAlreadyExistsError } from "../error/user-already-exists-error.js"

interface UpdateUserUseCaseRequest{
    publicId: string,
    username?: string,
    email?: string,
    name?: string,
}

type UpdateUserUseCaseResponse = {
    user: User
}

export class UpdateUserUseCase{
    
    //Instância o UsersRepositpory , para fazer a conexão dos comandos de banco de dados 
    // , salvar , buscars , entre outra meios de query do Prisma.
    constructor(private usersRepository: UsersRepository){}
    
    async execute({
        publicId,
        name,
        username,
        email,
    }:UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse>{

        const userToUpdate = await this.usersRepository.findBy({publicId})

        if(!userToUpdate){
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.update(userToUpdate.id,{
            name,
            username,
            email,
        })

        return {user}

    }
}