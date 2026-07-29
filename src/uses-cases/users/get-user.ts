import type { User } from "@/@types/prisma/client.js"
import type { UsersRepository } from "@/repositories/users-repositories.js"
import { ResourceNotFoundError } from "../error/resource-not-found-error.js"

interface GetUserUseCaseResquest {
    publicId: string
}

type GetUserUseCaseResponse = {
    user: User
}

export class GetUserUseCase{
    
    //Instância o UsersRepositpory , para fazer a conexão dos comandos de banco de dados 
    // , salvar , buscars , entre outra meios de query do Prisma.
    constructor(private usersRepository: UsersRepository){}
    
    async execute({
        publicId,
    }:GetUserUseCaseResquest): Promise<GetUserUseCaseResponse>{

        //Puxa pela instância do repository a execução de criação do user pelo prisma
        const user = await this.usersRepository.findBy({publicId})

        if(!user){
            throw new ResourceNotFoundError()
        }

        return {user}

    }
}