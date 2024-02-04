

import CreateUser from "./core/user/application/CreateUser";


import LoginUser from "./core/user/application/LoginUser";
import Jwt from "./core/user/adapters/tmp/tmp_Jwt";
import User from "./core/user/domain/User";
import UserRepository from "./core/user/adapters/tmp/tmp_UserRepository";
import MagicLink from "./core/user/adapters/tmp/tmp_MagicLink";
import Mailer from "./core/user/adapters/tmp/tmp_Mailer";

const create = new CreateUser(new MagicLink, new Mailer, new UserRepository)
const login = new LoginUser(new Mailer, new UserRepository, new Jwt)

const newUser: User = {
    username: 'newUser',
    email:'test@test.com'
}
await create.handle(newUser)
login.handle('556e2e8b-d7dd-489c-bd0c-d5fbee7c42bc')
