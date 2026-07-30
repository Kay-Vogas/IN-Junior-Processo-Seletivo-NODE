export class InvalidCredencialsError extends Error{
    constructor(){
        super('Credências Incorretas!')
    }
}