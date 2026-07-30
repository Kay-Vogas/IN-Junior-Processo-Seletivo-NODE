import { PrismaMoviesRepository } from "@/repositories/prisma/movies-prisma-repositories.js";
import { RegisterMovieUseCase } from "../movies/register.js";

export function makeRegisterMovieUseCase(){

    const moviesRepository = new PrismaMoviesRepository()
    const registerMovieUseCase = new RegisterMovieUseCase(moviesRepository)

    return registerMovieUseCase
}

