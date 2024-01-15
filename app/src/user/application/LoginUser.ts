import { error } from "../../shared/Errors";
import UseCase from "../../shared/UseCase";
import { CryptoPassword } from "../domain/CryptoPasswordProvider";
import User from "../domain/User";
import { UsersRepository } from "../domain/UsersRepository";
import UserCollection from "../repository/UserColection";

type loginUser = {
    password:string
    email: string
}

export default class LoginUser implements UseCase<loginUser, User | undefined  > {

    private crypto
    private usersCollection

    constructor ( crypto: CryptoPassword, usersCollection: UsersRepository ) {
        this.crypto = crypto
        this.usersCollection = usersCollection
    }

    async handle(dto: loginUser): Promise<User | undefined> {
        console.log('-----------------Login User-----------------');
        const user = await this.usersCollection.findByEmail(dto.email)
        console.log('começo do login:', user);
        
        if ( !user?.password  ) return 
        
        const isPasswordEqual = await this.crypto.compare(dto.password, user.password)
        console.log(isPasswordEqual)
        if ( !isPasswordEqual ) return undefined
        
        return { 
            username: user.username,
            email: user.email
        }
    }
    

}