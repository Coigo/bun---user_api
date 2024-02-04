import { TokenType } from "./MagicLink"
import User from "./User"

export type saveTokenType = {
    email:string
    token: string
}


export interface UsersRepository {
    create: (newUser:Required<User>) => Promise<User>
    findByEmail: (email:string) => Promise< User| undefined >
    saveToken: ({email, token}: saveTokenType ) => Promise<saveTokenType | undefined>
    findToken: (token: string) => Promise< TokenType | undefined >
    deleteUsedToken: (token:string) => Promise< string | undefined>

    clear?:() => void
    createExpiredToken?:() => Date
}