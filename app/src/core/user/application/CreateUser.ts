import UseCase from "../../shared/UseCase";

import User from "../domain/User";
import { UsersRepository } from "../domain/UsersRepository";
import UserCollection from "../adapters/tmp/tmp_UserRepository";
import { error } from "../../shared/Errors";
import { MailerProvider } from "../domain/Mailer";
import dotenv from 'dotenv'
import MagicLink from "../adapters/tmp/tmp_MagicLink";
import { IMagicLink } from "../domain/MagicLink";

dotenv.config()

export default class CreateUser implements UseCase<Required<User>, User | error[]> {
    private mailer: MailerProvider
    private magicLink: IMagicLink
    private usersCollection: UsersRepository

    constructor ( magicLink: IMagicLink, mailer: MailerProvider, usersCollection: UsersRepository ) {
        this.mailer = mailer
        this.usersCollection = usersCollection
        this.magicLink = magicLink
    }

    public async handle(user: Required<User>): Promise< User | error[]> {      
        const { valid, errors } = await this.validateNewUser(user)

        if ( valid ) {
            await this.usersCollection.create(user)
            const token = this.magicLink.generateUUID()

            await this.usersCollection.saveToken({
                email: user.email,
                token: token
            })
            await this.mailer.mailMagicLink({
                address: user.email,
                link: `${process.env.suve_url}/login/${token}`
            })
            return user

        }
        else return errors
    }

    private async validateNewUser (newUser: Required<User>) {
        const errors: error[] = [] 
        const { email } = newUser

        if ( await this.usersCollection.findByEmail(email) ) {
            errors.push({
                message:'Email já utilizado.',
                code: 400
            })
        }
        return {
            valid: errors.length === 0,
            errors
        }

    }

}