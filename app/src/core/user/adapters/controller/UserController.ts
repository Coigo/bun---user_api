import { validate } from "../../../../util";
import CreateUser from "../../application/CreateUser";
import LoginUser from "../../application/LoginUser";
import User from "../../domain/User";
import MagicLink from "../geral/MagicLink";
import Jwt from "../geral/Jwt";
import Mailer from "../geral/Mailer";
import UserRepository from "../repository/UserRepository";



export default class UserController  {

    public async createUser (newUser: Required<User>) {
        const create = new CreateUser(new MagicLink, new Mailer,new UserRepository )
        return await create.handle(newUser)
    }

    public async login ( token: string ) {
        const login = new LoginUser(new Mailer, new UserRepository, new Jwt)
        return await login.handle(token)
    }

}