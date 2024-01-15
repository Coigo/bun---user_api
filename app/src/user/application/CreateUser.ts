import UseCase from "../../shared/UseCase";
import { CryptoPassword } from "../domain/CryptoPasswordProvider";
import User from "../domain/User";
import { UsersRepository } from "../domain/UsersRepository";
import UserCollection from "../repository/UserColection";


export default class CreateUser implements UseCase<Required<User>, User> {
    private crypto: CryptoPassword
    private usersCollection: UsersRepository

    constructor ( crypto: CryptoPassword, usersCollection: UsersRepository ) {
        this.crypto = crypto
        this.usersCollection = usersCollection
    }

    public async handle(user: Required<User>): Promise<User> {
        console.log('-----------------Create User-----------------');
        
        const { password } = user
        const encryptedPassword = await this.crypto.encrypt(password)
        const cryptoUser = { ...user, password: encryptedPassword }
        console.log('usuario existente:', await this.usersCollection.findByEmail(user.email))
        
        await this.usersCollection.create(cryptoUser)
        return user       
    }

}