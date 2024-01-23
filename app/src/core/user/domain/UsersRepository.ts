import User from "./User"

export interface UsersRepository {
    create: (newUser:Required<User>) => Promise<User>
    findByEmail: (email:string) => Promise< User| undefined >
    clear?:() => void
}