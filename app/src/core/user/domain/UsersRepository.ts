import { LoginType, TokenType } from "./PassKey"
import User from "./User"

export type saveTokenType = {
    email:string
    passKey: string
}


export interface UsersRepository {
    create: (newUser:Required<User>) => Promise<User>
    findByEmail: (email:string) => Promise< User| undefined >
    saveToken: ({email, passKey}: saveTokenType ) => Promise<saveTokenType | undefined>
    findToken: ({passKey, email}: LoginType) => Promise< TokenType | undefined >
    deleteUsedToken: (id:number) => Promise< number | undefined>

    clear?:() => void
    createExpiredToken?:() => Date
}