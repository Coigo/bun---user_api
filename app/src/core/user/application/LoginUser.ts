import { error } from "../../shared/Errors";
import UseCase from "../../shared/UseCase";
import { CryptoPassword } from "../domain/CryptoPasswordProvider";
import User from "../domain/User";
import { UsersRepository } from "../domain/UsersRepository";
import UserCollection from "../adapters/tmp/tmp_UserRepository";
import { MailerProvider } from "../domain/Mailer";
import dotenv from 'dotenv'
import { JwtProvider } from "../domain/Jwt";
import { TokenType } from "../domain/MagicLink";

dotenv.config()


export default class LoginUser implements UseCase<string, string | undefined  > {

    private mailer
    private jwt
    private usersRepository

    constructor ( mailer: MailerProvider, usersRepository: UsersRepository, jwt: JwtProvider) {
        this.mailer = mailer
        this.usersRepository = usersRepository
        this.jwt = jwt

    }

    async handle(token: string): Promise<string | undefined> {
        try {    
            const findToken = await this.usersRepository.findToken(token)
            if ( !findToken || !this.isTokenValid(findToken) ) {
                return
            }
            const user = await this.usersRepository.findByEmail(findToken.email)
            
            if ( !user ) {
                return
            }
            this.usersRepository.deleteUsedToken(token)
            return this.jwt.sign(user)
        } 
        catch ( err ) {
            console.log(err);
            return
        }
    }
    
    private isTokenValid (tokenDTO: TokenType) {
        if ( !tokenDTO || !tokenDTO.createdAt || !tokenDTO.token ) {
            return false
        }
        const { createdAt, valid } = tokenDTO;
        
        if ( !this.validateTokenLife(createdAt) ) { 
            return false
        }
        if ( !this.haveTokenBeenUsed(valid) ) {
            return false
        }
        return true
    }

    private haveTokenBeenUsed (valid: number) {
        if ( valid === 0 ) {
            return false
        }
        return true
    }

    private validateTokenLife (createdAt: Date) {
        const now = new Date();
        
        const tokenBirth = new Date(createdAt);
        const minuteDiff = (now.getTime() - tokenBirth.getTime()) / 1000 / 60;

        const tokenMaxLife = Number(process.env.token_max_life) 
        if ( minuteDiff > tokenMaxLife ) return false

        return true
    }

}