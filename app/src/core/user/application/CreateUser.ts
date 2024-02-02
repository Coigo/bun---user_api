import UseCase from "../../shared/UseCase";
import { CryptoPassword } from "../domain/CryptoPasswordProvider";
import User from "../domain/User";
import { UsersRepository } from "../domain/UsersRepository";
import UserCollection from "../adapters/repository/UserColection";
import { error } from "../../shared/Errors";
import { MagicLink } from "../domain/MagicLink";
import { MailerProvider } from "../domain/Mailer";
import dotenv from 'dotenv'

dotenv.config()

export default class CreateUser implements UseCase<Required<User>, User | error[]> {
    private mailer: MailerProvider
    private magicLink: MagicLink
    private usersCollection: UsersRepository

    constructor ( magicLink: MagicLink, mailer: MailerProvider, usersCollection: UsersRepository ) {
        this.mailer = mailer
        this.usersCollection = usersCollection
        this.magicLink = magicLink
    }

    public async handle(user: Required<User>): Promise< User | error[]> {      
        const { valid, errors } = await this.validateNewUser(user)

        if ( valid ) {
            await this.usersCollection.create(user)
            const magicLink = this.magicLink.generateUUID()

            await this.usersCollection.saveToken({
                email: user.email,
                linkToken: magicLink
            })
            await this.mailer.mailMagicLink({
                address: user.email,
                link: `${process.env.suve_url}/login/${magicLink}`
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