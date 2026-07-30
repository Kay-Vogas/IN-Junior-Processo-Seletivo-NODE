import type { User } from "@/@types/prisma/client.js"
import type { UsersRepository } from "@/repositories/users-repositories.js"
import { InvalidCredencialsError } from "../error/invalid-crendecials-error.js"
import { compare } from "bcryptjs"

interface AuthenticateUserUseCaseRequest {
    login: string,
    password:string
}

type AuthenticateUserUseCaseResponse = {
    user: User
}

export class AuthenticateUserUseCase{

    constructor(private userRepository:UsersRepository){}

    async execute({
        login,password
    }:AuthenticateUserUseCaseRequest):Promise<AuthenticateUserUseCaseResponse>{
        const user = await this.userRepository.findByEmailOrUsaname(login,login)

        if(!user){
            throw new InvalidCredencialsError()
        }

        const doesPasswordMatches = await compare(password,user.passwordHash)
        
        if (!doesPasswordMatches){
            throw new InvalidCredencialsError()
        }

        return {user}

    }

}