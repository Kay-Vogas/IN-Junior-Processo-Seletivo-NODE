import type { Prisma, Session } from "@/@types/prisma/client.js";

export interface SessionsRepository{
    //o SessionUncheckedCreateInput ele irá fazer a o relacionamento 
    // da tabela Sessions com outra tabela 
    create(data: Prisma.SessionUncheckedCreateInput):Promise<Session>
}