import type { Session } from "@/@types/prisma/client.js"

type HTTPSession = {
    id: string
    startTime: Date
    createdAt: Date
    updatedAt: Date

}

export class SessionPresenter{

    static toHTTP(session:Session):HTTPSession
    static toHTTP(sessions:Session[]):HTTPSession[]
    static toHTTP(input: Session | Session[]):HTTPSession | HTTPSession[]{
        if(Array.isArray(input)){
            return input.map((Session) => this.toHTTP(Session))
        }

        return {
            id: input.publicId,
            startTime:  input.startTime, 
            createdAt: input.createdAt,
            updatedAt: input.updatedAt
        }
    }
}