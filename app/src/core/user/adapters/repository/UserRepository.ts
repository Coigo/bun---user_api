import User from "../../domain/User";
import { UsersRepository, saveTokenType } from "../../domain/UsersRepository";
import { db } from "../../../../infrastructure/index";
import { users, loginTokens } from "../../../../infrastructure/schema/schema";
import { and, eq } from "drizzle-orm";
import { LoginType } from "../../domain/PassKey";

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
                id: users.id,
                email: users.email,
                username:users.username
            }
        ).from(users)
        .where(eq(users.email, email))
        return user[0]
    }

    public async saveToken ({email, passKey}: saveTokenType) {
        try {
            await db.insert(loginTokens).values({
                passKey,
                email,
            })
            return {email, passKey}
        }
        catch (err) {
            console.log(err);
        }
    }

    public async findToken ({passKey, email}: LoginType) {
        const loginToken = await db.select({
            id: loginTokens.id,
            passKey: loginTokens.passKey,
            email: loginTokens.email,
            createdAt: loginTokens.createdAt,
            valid: loginTokens.valid

        })
        .from(loginTokens)
        .where(
            and(
                eq(loginTokens.passKey, passKey),
                eq(loginTokens.email, email),
                eq(loginTokens.valid, '1')) 
        )
        
        
        if ( !loginToken[0] ) return
        return {
            ...loginToken[0],
            valid: Number(loginToken[0].valid)
        }
    }
    
    public async deleteUsedToken (tokenId: number) {
        
        await db.update(loginTokens)
            .set({ valid:'0' })
            .where(eq(loginTokens.id, tokenId))

        return tokenId    
    } 

}

