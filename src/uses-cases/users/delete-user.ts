import type { UsersRepository } from "@/repositories/users-repositories.js"
import { ResourceNotFoundError } from "../error/resource-not-found-error.js"

interface DeleteUserUseCaseResquest {
    publicId: string
}


export class DeleteUserUseCase{
    
    //Instância o UsersRepositpory , para fazer a conexão dos comandos de banco de dados 
    // , salvar , buscars , entre outra meios de query do Prisma.
    constructor(private usersRepository: UsersRepository){}
    
    async execute({
        publicId,
    }:DeleteUserUseCaseResquest){

        const user = await this.usersRepository.findBy({publicId})

        if(!user){
            throw new ResourceNotFoundError()
        }

        await this.usersRepository.delete(user.id)
    }
}