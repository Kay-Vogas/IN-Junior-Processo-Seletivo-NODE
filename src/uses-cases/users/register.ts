import type { User } from "@/@types/prisma/client.js"
import { env } from "@/env/index.js"
import type { UsersRepository } from "@/repositories/users-repositories.js"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "../error/user-already-exists-error.js"

interface RegisterUserUseCaseRequest{
    username: string,
    email: string,
    name: string,
    password: string
}

type RegisterUserUseCaseResponse = {
    user: User
}

export class RegisterUserUseCase{
    
    //Instância o UsersRepositpory , para fazer a conexão dos comandos de banco de dados 
    // , salvar , buscars , entre outra meios de query do Prisma.
    constructor(private usersRepository: UsersRepository){}
    
    async execute({
        username,
        email,
        name,
        password
    }:RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse>{

        //Puxa pela instância do repository a execução de busca por Username/Email do DB pelo prisma
        const userWithSameEmailOrUsername = await this.usersRepository.findByEmailOrUsaname(
            email,
            username
        )

        if(!userWithSameEmailOrUsername){
            throw new UserAlreadyExistsError()
        }

        //Criptografia da senha enviada pelo user
        const passwordHash = await hash(password,env.HASH_SALT_ROUNDS)


        //Puxa pela instância do repository a execução de criação do user pelo prisma
        const user = await this.usersRepository.create({
            username,
            email,
            name,
            passwordHash,
        })

        return {user}

    }
}