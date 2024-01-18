import { expect, expectTypeOf, test, it } from 'vitest'
import CreateUser from './CreateUser'
import Crypto from '../adapters/geral/CryptoPassword'
import UserCollection from '../adapters/repository/UserColection'
import { error } from '../../shared/Errors'



it('Should not be possible to create a new user with < 8 length password', async () => {
    new UserCollection().clear()
    const create = new CreateUser( new Crypto(), new UserCollection() )
    
    const errorExpected = [{
        message:'Senha inválida.',
        code: 400
    }]

    const newUser = {
        email:'teste@teste.com',
        username:'user',
        password:'123'
    }
 
    expect( await create.handle(newUser) )
        .toEqual(errorExpected)
        


}) 
it('Should be possible to create a new user', async () => {
    new UserCollection().clear()
    const create = new CreateUser( new Crypto(), new UserCollection() )
    
    const newUser = {
        email:'teste@teste.com',
        username:'user',
        password:'123123123'
    }

    expect( await create.handle(newUser))
        
    
}) 

it('Should not be possible to create two accounts with the same email', async () => {
    new UserCollection().clear()
    const create = new CreateUser( new Crypto(), new UserCollection() )
    
    const errorExpected: error[] = [{
        message:'Email já utilizado.',
        code: 400
    }]

    const newUser = {
        email:'teste@teste.com',
        username:'user',
        password:'123123123'
    }
    await create.handle(newUser)

    expect( await create.handle(newUser))
    .toEqual(errorExpected)


})
