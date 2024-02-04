import { TokenType } from "../../domain/MagicLink";
import User from "../../domain/User";
import { UsersRepository, saveTokenType } from "../../domain/UsersRepository";
import dotenv from 'dotenv'

dotenv.config()

export default class UserRepository implements UsersRepository{

    static readonly users: User[] = []
    static readonly tokens: TokenType[] = [
        {
            createdAt: UserRepository.createExpiredToken(),
            email: 'notValid@test.com',
            token: '777e2e8b-d7dd-489c-bd0c-d5fbee7c42bc',
            valid: 1
        }
    ]

    async create ( newUser: User ): Promise<User> {
        UserRepository.users.push(newUser)  
        return newUser
    }

    async findByEmail ( email: string ): Promise< User| undefined> {
        return UserRepository.users.find(user => user.email === email)
    }

    async findToken ( token: string ): Promise<TokenType | undefined> {
        const result = await UserRepository.tokens.find(aToken => aToken.token === token)
        console.log(result);
        return result
    }

    public async saveToken ({ email, token }: saveTokenType) {
        UserRepository.tokens.push({ 
            email, 
            token,
            createdAt: new Date(),
            valid: 1
        })
        console.log(UserRepository.tokens);
        return { email, token }
    }

    public async deleteUsedToken (token: string) {
        const toDelete = UserRepository.tokens.find(aToken => aToken.token === token)
        if ( !toDelete ) {
            return
        }
        const index = UserRepository.tokens.indexOf(toDelete)
        UserRepository.tokens[index].valid = 0
        return token
    } 


    public async clear () {
        while (UserRepository.users.length > 0) {
            UserRepository.users.pop();
          }
        while (UserRepository.tokens.length > 0) {
            UserRepository.tokens.pop();
        }

    }

    static createExpiredToken() {
        const now = new Date();
        return new Date(now.setMinutes(now.getMinutes() - Number(process.env.token_max_life))) 
        
    }

}