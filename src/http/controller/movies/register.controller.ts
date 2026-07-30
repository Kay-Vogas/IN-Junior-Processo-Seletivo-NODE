import { MoviePresenter } from "@/http/presenters/movies-presenter.js";
import { makeRegisterMovieUseCase } from "@/uses-cases/factories/make-register-movie.js";
import type{ FastifyRequest,FastifyReply } from "fastify";
import {z} from 'zod'


export async function register(request: FastifyRequest,reply: FastifyReply) {
    try{
        const registerBodySchema = z.object({
            title:z.string().trim().min(1).max(100),
            genre:z.string().trim().min(1).max(50),
            ageRating:z.number().min(1).max(100),
        })

        const {title,genre,ageRating} = registerBodySchema.parse(request.body)

        const registerMovieUseCase = makeRegisterMovieUseCase()
        const {movie} = await registerMovieUseCase.execute({
            title,
            genre,
            ageRating
        })

        return reply.status(201).send(MoviePresenter.toHTTP(movie))

    }catch(error){
        
        throw new Error(`Erro ao criar o Movie, ${error}`) 
    }
}