import type { User } from "@/@types/prisma/client.js"
import type { UsersRepository } from "@/repositories/users-repositories.js"

 
type ListUserUseCaseResponse = {
    users: User[]
}

export class ListUserUseCase{
    
    //Instância o UsersRepositpory , para fazer a conexão dos comandos de banco de dados 
    // , salvar , buscars , entre outra meios de query do Prisma.
    constructor(private usersRepository: UsersRepository){}
    
    async execute(): Promise<ListUserUseCaseResponse>{

        //Puxa pela instância do repository a execução de criação do user pelo prisma
        const users = await this.usersRepository.list()

        return {users}

    }
}