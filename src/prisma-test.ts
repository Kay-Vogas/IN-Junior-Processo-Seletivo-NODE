
import { prisma } from "./libs/prisma.js"

async function main() {
    
    try{

        const user = await prisma.user.create({

            data: {
                name:'kayke',
                username:'kay',
                passwordHash:'teste',
                email:'kay@gmail.com',
            },
        })

        console.log('Usuário criado!')
        console.log(user)
    }catch(error){
        console.error('erro ao criar',error)
    }finally{
        await prisma.$disconnect()
    }

}

main()
