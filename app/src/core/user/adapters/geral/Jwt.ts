import jwt from 'jsonwebtoken'
import { JwtProvider } from '../../domain/Jwt';
import User from '../../domain/User';

export default class Jwt implements JwtProvider {

    public sign ( toSign:User, secret: string ) {
        return jwt.sign(toSign, secret, {
            algorithm:'HS256'
        })
    }

}