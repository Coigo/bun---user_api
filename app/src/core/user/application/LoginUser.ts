import { error } from "../../shared/Errors";
import UseCase from "../../shared/UseCase";
import { CryptoPassword } from "../domain/CryptoPasswordProvider";
import User from "../domain/User";
import { TokenType, UsersRepository } from "../domain/UsersRepository";
import UserCollection from "../adapters/repository/UserColection";
import { MailerProvider } from "../domain/Mailer";
import { linkToken } from "../domain/MagicLink";
import dotenv from 'dotenv'

dotenv.config()


export default class LoginUser implements UseCase<linkToken, User | undefined  > {

    private mailer
    private usersCollection

    constructor ( mailer: MailerProvider, usersCollection: UsersRepository ) {
        this.mailer = mailer
        this.usersCollection = usersCollection
    }

    async handle(token: linkToken): Promise<User | undefined> {
        try {
            const findToken = await this.usersCollection.findToken(token)
            if ( !findToken || !this.isTokenValid(findToken) ) {
                console.log('nao ta');
                
                return
            }
            const user = await this.usersCollection.findByEmail(findToken.email)
            if ( !user ) {
                return
            }
            return { 
                username: user.username,
                email: user.email
            }
        } 
        catch ( err ) {
            console.log(err);
            return
        }
    }
    
    private isTokenValid (tokenDTO: TokenType| undefined) {
        if ( !tokenDTO || !tokenDTO.createdAt || !tokenDTO.token ) {
            return false
        }
        const { createdAt } = tokenDTO;
        
        if ( !this.validateTokenLife(createdAt) ) { 
            console.log('ta salvo');
            
            return false
        }
        return true
    }

    private validateTokenLife (createdAt: Date) {
        const now = new Date();
        
        const tokenBirth = new Date(createdAt);
        const minuteDiff = (now.getTime() - tokenBirth.getTime()) / 1000 / 60;

        const tokenMaxLife = Number(process.env.token_max_life)

        console.log(minuteDiff);
        console.log(tokenMaxLife);
        
        
        if ( minuteDiff > tokenMaxLife ) return false

        return true
    }

}