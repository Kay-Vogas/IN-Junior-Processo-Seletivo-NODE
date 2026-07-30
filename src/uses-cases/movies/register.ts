import type { Movie } from "@/@types/prisma/client.js"
import type { MoviesRepository } from "@/repositories/movies-repositories.js"

interface RegisterMovieUseCaseRequest{
    title: string,
    genre: string,
    ageRating: number
}

type RegisterMovieUseCaseRsponse = {
    movie: Movie
}

export class RegisterMovieUseCase {

    constructor(private moviesRepository: MoviesRepository){}

    async execute({title,genre,ageRating
    }:RegisterMovieUseCaseRequest):Promise<RegisterMovieUseCaseRsponse>{
       
        //TERMINAR VALIDAÇÃO POIS NÃO RETORNA NADA QUANDO É O MESMO TITLE
        const verificacaoExistenciaFilme = await this.moviesRepository.findBy({
            title
        })

        if(verificacaoExistenciaFilme){
            throw new Error('Já existe um filme com este Título')
        }
            
        const movie = await this.moviesRepository.create({
                title,
                genre,
                ageRating
        })
        
        return {movie}
    }


}