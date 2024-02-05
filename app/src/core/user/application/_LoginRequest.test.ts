import { expect, it } from "vitest";
import LoginRequest from "./LoginRequest";
import CreateUser from "./CreateUser";
import MagicLink from "../adapters/tmp/tmp_MagicLink";
import Mailer from "../adapters/tmp/tmp_Mailer";
import UserRepository from "../adapters/tmp/tmp_UserRepository";

const newUser = {
    email:'teste@teste.com',
    username:'user'
}

it('Should be possible to make a login request', async () => {

    const create = new CreateUser( new MagicLink, new Mailer, new UserRepository )
    const loginRequest = new LoginRequest(new MagicLink, new Mailer, new UserRepository)

    await create.handle(newUser)
    
    expect( await loginRequest.handle(newUser.email) )
        .toEqual(newUser)

})

it('Should not be possible to make a login request with no account registred', async () => {

    const create = new CreateUser( new MagicLink, new Mailer, new UserRepository )
    const loginRequest = new LoginRequest(new MagicLink, new Mailer, new UserRepository)

    await create.handle(newUser)

    expect( await loginRequest.handle('randomEmail@test.com'))
        .toBeUndefined()
})