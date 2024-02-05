import User from "../../domain/User";
import { UsersRepository, saveTokenType } from "../../domain/UsersRepository";
import { db } from "../../../../infrastructure/index";
import { users, loginTokens } from "../../../../infrastructure/schema/schema";
import { eq } from "drizzle-orm";

export default class UserRepository implements UsersRepository {
    
    public async create (newUser: Required<User>) {
        const {username, email } = newUser

        await db.insert(users).values({
            username,
            email,
        })
        return newUser
    }


    public async findByEmail (email: string) {
        const user = await db.select(
            {
                email: users.email,
                username:users.username
            }
        ).from(users)
        .where(eq(users.email, email))
        return user[0]
    }

    public async saveToken ({email, token}: saveTokenType) {
        try {
            await db.insert(loginTokens).values({
                token,
                email,
            })
            return {email, token}
        }
        catch (err) {
            console.log(err);
        }
    }

    public async findToken (token: string) {
        const loginToken = await db.select({
            token: loginTokens.token,
            email: loginTokens.email,
            createdAt: loginTokens.createdAt,
            valid: loginTokens.valid

        })
        .from(loginTokens)
        .where(eq(loginTokens.token, token))
        
        if ( !loginToken[0] ) return
        return {
            ...loginToken[0],
            valid: Number(loginToken[0].valid)
        }
    }
    
    public async deleteUsedToken (token: string) {
        
        await db.update(loginTokens)
            .set({ valid:'0' })
            .where(eq(loginTokens.token, token))

        return token    
    } 

}

