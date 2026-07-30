import { PrismaMoviesRepository } from "@/repositories/prisma/movies-prisma-repositories.js";
import { PrismaSessionsRepository } from "@/repositories/prisma/sessions-prisma-repository.js";
import { CreateSeassionUseCase } from "../sessions/create-sessions.js";

export function makeCreateSessionUseCase(){

    const sessionsRepository = new PrismaSessionsRepository()
    const moviesRepository = new PrismaMoviesRepository()

    const createSeassionUseCase = new CreateSeassionUseCase(
        moviesRepository,sessionsRepository
    )
    
    return createSeassionUseCase

}