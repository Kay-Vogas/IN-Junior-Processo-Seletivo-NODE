import type { Session } from "@/@types/prisma/client.js"
import type { MoviesRepository } from "@/repositories/movies-repositories.js"
import type { SessionsRepository } from "@/repositories/sessions-repository.js"
import { ResourceNotFoundError } from "../error/resource-not-found-error.js"

interface CreateSeassionUseCaseRequest{
    moviePublicId: string
    startTime: Date
}

type CreateSeassionUseCaseResponse = {
    session: Session
}

export class CreateSeassionUseCase {

    constructor(private moviesRepository: MoviesRepository,
        private sessionsRepository: SessionsRepository
    ){}

    async execute({startTime,moviePublicId
    }:CreateSeassionUseCaseRequest):Promise<CreateSeassionUseCaseResponse>{
    
        const movie = await this.moviesRepository.findBy({
                publicId:moviePublicId
        })
        
        if(!movie){
            throw new ResourceNotFoundError()
        }

        const session = await this.sessionsRepository.create({
            startTime,
            movieId: movie.id,
        })

        return {session}
    }


}