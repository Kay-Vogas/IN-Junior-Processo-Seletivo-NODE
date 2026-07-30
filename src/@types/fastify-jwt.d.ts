import type { USER_ROLE } from "./prisma/enums.ts";
import fastifyJwt from "@fastify/jwt";

declare module '@fastify/jwt'{

    interface FastifyJWT{
        payload: {sub: string;role: USER_ROLE}
        user: {sub: string ; role: USER_ROLE}
    }

}