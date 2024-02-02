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

    public async saveToken ({email, linkToken}: saveTokenType) {
        try {
            await db.insert(loginTokens).values({
                id: linkToken,
                email,
            })
            return {email, linkToken}
        }
        catch (err) {
            console.log(err);
        }
    }

    public async findToken (token: string) {
        const loginToken = await db.select({
            token: loginTokens.id,
            email: loginTokens.email,
            createdAt: loginTokens.createdAt

        })
        .from(loginTokens)
        .where(eq(loginTokens.id, token))
        
        if ( !loginToken[0] ) return
        return loginToken[0]
    }
    
}

