import { LoginType, TokenType } from "../../domain/PassKey";
import User from "../../domain/User";
import { UsersRepository, saveTokenType } from "../../domain/UsersRepository";
import dotenv from 'dotenv'

dotenv.config()

export default class UserRepository implements UsersRepository{

    static readonly users: User[] = []
    static readonly tokens: TokenType[] = [
        {
            id: 2,
            createdAt: UserRepository.createExpiredToken(),
            email: 'notValid@test.com',
            passKey: '654321',
            valid: 1
        }
    ]

    async create ( newUser: User ): Promise<User> {
        UserRepository.users.push({
            ...newUser,
            id: 1
        })  
        return newUser
    }

    async findByEmail ( email: string ): Promise< User| undefined> {
        return UserRepository.users.find(user => user.email === email)
    }

    async findToken ({passKey, email}: LoginType ): Promise<TokenType | undefined> {
        const result = await UserRepository.tokens.find(aToken => aToken.passKey === passKey && aToken.email === email)
        return result
    }

    public async saveToken ({ email, passKey }: saveTokenType) {
        UserRepository.tokens.push({ 
            id: 1,
            email, 
            passKey,
            createdAt: new Date(),
            valid: 1
        })
        return { email, passKey }
    }

    public async deleteUsedToken (tokenId: number) {
        const toDelete = UserRepository.tokens.find(aToken => aToken.id === tokenId)
        if ( !toDelete ) {
            return
        }
        const index = UserRepository.tokens.indexOf(toDelete)
        UserRepository.tokens[index].valid = 0
        return tokenId
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