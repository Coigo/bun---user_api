import User from "../../domain/User";
import { UsersRepository } from "../../domain/UsersRepository";
import { db } from "../../../../infrastructure/index";
import { users } from "../../../../infrastructure/schema/schema";
import { eq } from "drizzle-orm";

export default class UserRepository implements UsersRepository {
    
    public async create (newUser: Required<User>) {
        const {username, email, password } = newUser

        await db.insert(users).values({
            username,
            password,
            email,
        })
        return newUser
    }


    public async findByEmail (email: string) {
        const user = await db.select(
            {
                email: users.email,
                username:users.username, 
                password: users.password
            }
        ).from(users)
        .where(eq(users.email, email))
        return user[0]
    }
}

