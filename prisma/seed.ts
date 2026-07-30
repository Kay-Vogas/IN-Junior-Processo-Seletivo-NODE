import { env } from "@/env/index.js";
import { prisma } from "@/libs/prisma.js";
import { hash } from "bcryptjs";

export async function seed() {
    await prisma.user.upsert({
        where:{
            email:"admin@example.com",
        },
        update:{},
        create:{
            publicId: "000000-000000-000000-000000000001",
            username: "admin",
            email: "admin@example.com",
            name: "ADMIN",
            passwordHash: await hash("123123123",env.HASH_SALT_ROUNDS),
            role:"ADMIN"
        }

        
    })
    console.log("Database seeded sucessfully.")
}

seed()
    .then(()=>{
        prisma.$disconnect()
        process.exit(0)
    })
    .catch((error)=>{
        console.error('Error seeding database',error)
        prisma.$disconnect()
        process.exit(1)
    
    })