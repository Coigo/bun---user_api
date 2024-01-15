import User from "./User"

export interface UsersRepository {
    create: (newUser:User) => Promise<User>
    findByEmail: (email:string) => Promise< User| undefined >
}