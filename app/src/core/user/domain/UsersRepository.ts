import { linkToken } from "./MagicLink"
import User from "./User"

export type saveTokenType = {
    email:string
    linkToken: linkToken
}

export type TokenType = {
    token: string;
    email: string;
    createdAt: Date | null;
}

export interface UsersRepository {
    create: (newUser:Required<User>) => Promise<User>
    findByEmail: (email:string) => Promise< User| undefined >
    saveToken: ({email, linkToken}: saveTokenType ) => Promise<saveTokenType | undefined>
    findToken: (token: linkToken) => Promise< TokenType | undefined >

    clear?:() => void
}