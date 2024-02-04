import UseCase from "../../shared/UseCase";
import { IMagicLink } from "../domain/MagicLink";
import { MailerProvider } from "../domain/Mailer";
import User from "../domain/User";
import { UsersRepository } from "../domain/UsersRepository";

export default class LoginRequest implements UseCase<string, User | undefined >{

    private mailer
    private magicLink
    private userRepository

    constructor (magicLink: IMagicLink, mailer: MailerProvider, userRepository: UsersRepository ) {
        this.magicLink = magicLink
        this.mailer = mailer
        this.userRepository = userRepository
    }

    public async handle (email: string): Promise< User| undefined> {
    
        const user = await this.userRepository.findByEmail(email)
        if ( !user ) {
            return
        }
        const token = this.magicLink.generateUUID()
        const saveToken = await this.userRepository.saveToken({email, token})

        const mail = await this.mailer.mailMagicLink({
            address: user.email,
            link: `${process.env.suve_url}/login/${token}`            
        })

        return user

    }

}