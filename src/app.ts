import fastify from 'fastify'
import {appRoutes} from './http/controller/routes.js' 

// instância da aplicação
export const app = fastify()

app.register(appRoutes)