import Mailer from "./core/user/adapters/geral/Mailer";

import CreateUser from "./core/user/application/CreateUser";
import MagicLink from "./core/user/adapters/geral/CreateMagicLink";
import UserRepository from "./core/user/adapters/repository/UserRepository";

const create = new CreateUser(new MagicLink(), new Mailer(), new UserRepository())

create.handle({
    email: 'codigo.tolmr@gmail.com',
    username: 'username'
})