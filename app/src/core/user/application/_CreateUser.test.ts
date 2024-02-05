import { expect, expectTypeOf, test, it } from 'vitest'
import CreateUser from './CreateUser'
import UserCollection from '../adapters/tmp/tmp_UserRepository'
import { error } from '../../shared/Errors'
import MagicLink from '../adapters/tmp/tmp_MagicLink'
import Mailer from '../adapters/tmp/tmp_Mailer'
import UserRepository from '../adapters/tmp/tmp_UserRepository'

const newUser = {
    email:'teste@teste.com',
    username:'user'
}

it('Should be possible to create a new user', async () => {
    new UserCollection().clear()
    const create = new CreateUser( new MagicLink, new Mailer, new UserRepository )

    expect( await create.handle(newUser))
        .toEqual(newUser)
}) 

it('Should not be possible to create two accounts with the same email', async () => {
    new UserCollection().clear()
    const create = new CreateUser( new MagicLink, new Mailer, new UserRepository )
    
    const errorExpected: error[] = [{
        message:'Email já utilizado.',
        code: 400
    }]

    await create.handle(newUser)

    expect( await create.handle(newUser))
    .toEqual(errorExpected)
})
