import {expect, it} from 'vitest'
import LoginUser from './LoginUser'
import Crypto from '../adapters/geral/CryptoPassword'
import UserCollection from '../adapters/repository/UserColection'
import CreateUser from './CreateUser'

const clearColection = new UserCollection().clear

it('Should be possible to login normally', async () => {
    clearColection()
    const create = new CreateUser(new Crypto(), new UserCollection())
    const login = new LoginUser(new Crypto(), new UserCollection())

    const user = {
        email:'teste@teste.com',
        username:'user',
        password:'123123123'
    }

    await create.handle(user)

    expect(await login.handle(user))
        .toEqual({...user, password: undefined})


})

it('Should not be possible to login with no email registered', async () => {
    clearColection()



    const create = new CreateUser(new Crypto(), new UserCollection())
    const login = new LoginUser(new Crypto(), new UserCollection())

    const user = {
        email:'teste@teste.com',
        username:'user',
        password:'123123123'
    }

    await create.handle(user)

    expect(await login.handle({...user, email:'someRandomEmail@test.com'}))
        .toBeUndefined()


})

it('Should not be possible to login with wrong password', async () => {
    clearColection()

    const create = new CreateUser(new Crypto(), new UserCollection())
    const login = new LoginUser(new Crypto(), new UserCollection())

    const user = {
        email:'teste@teste.com',
        username:'user',
        password:'123123123'
    }

    await create.handle(user)

    expect(await login.handle({...user, password:'pleaseGetItRigth'}))
        .toBeUndefined()


})