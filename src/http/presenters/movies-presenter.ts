import type { Movie } from "@/@types/prisma/client.js"

type HTTPMovie = {
    id: string,
    title: string
    genre: string
    ageRating: number
}

export class MoviePresenter{

    static toHTTP(movie:Movie):HTTPMovie
    static toHTTP(movie:Movie[]):HTTPMovie[]
    static toHTTP(input: Movie | Movie[]):HTTPMovie | HTTPMovie[]{
        if(Array.isArray(input)){
            return input.map((movie) => this.toHTTP(movie))
        }
    
        return{
            id: input.publicId,
            title: input.title,
            genre: input.genre,
            ageRating: input.ageRating,
        }
    }
}