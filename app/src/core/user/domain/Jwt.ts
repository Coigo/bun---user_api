import User from "./User"

export interface JwtProvider {
    sign: (toSign: User, secret: string) => string 
}