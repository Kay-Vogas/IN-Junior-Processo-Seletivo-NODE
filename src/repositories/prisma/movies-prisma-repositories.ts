import type { MovieCreateInput, MovieUpdateInput,MovieWhereInput } from "@/@types/prisma/models.js"
import type { MoviesRepository } from "../movies-repositories.js"
import { prisma } from "@/libs/prisma.js"

export class PrismaMoviesRepository implements MoviesRepository{
    async create(data: MovieCreateInput){
        return await prisma.movie.create({data})
    }
    async findBy(where: MovieWhereInput){
        return await prisma.movie.findFirst({where})
    }
    async list(){
        return await prisma.movie.findMany()
    }
    async delete(id: number) {
        await prisma.movie.delete({where: {id}}) 
    }
    async update(id: number, data: MovieUpdateInput) {
        return await  prisma.movie.update({
            where:{id},
            data
        })
    }
    
}