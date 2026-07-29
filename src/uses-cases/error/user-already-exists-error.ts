export class UserAlreadyExistsError extends Error{

    constructor(){
        super('Já existe um usuário com este Username ou Email no sistema !')
    }

}