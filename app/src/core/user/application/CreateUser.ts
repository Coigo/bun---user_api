import UseCase from "../../shared/UseCase";
import { CryptoPassword } from "../domain/CryptoPasswordProvider";
import User from "../domain/User";
import { UsersRepository } from "../domain/UsersRepository";
import UserCollection from "../adapters/repository/UserColection";
import { error } from "../../shared/Errors";


export default class CreateUser implements UseCase<Required<User>, User | error[]> {
    private crypto: CryptoPassword
    private usersCollection: UsersRepository

    constructor ( crypto: CryptoPassword, usersCollection: UsersRepository ) {
        this.crypto = crypto
        this.usersCollection = usersCollection
    }

    public async handle(user: Required<User>): Promise< User | error[]> {      
        const { password } = user
        const { valid, errors } = await this.validate(user)

        if ( valid ) {
            const encryptedPassword = await this.crypto.encrypt(password)
            const cryptoUser = { ...user, password: encryptedPassword }
            await this.usersCollection.create(cryptoUser)
            return user       

        }
        else return errors
    }

    private async validate (newUser: Required<User>) {
        const errors: error[] = [] 
        const { password, email, username } = newUser

        if ( password.length < 8 ) {
            errors.push({
                message:'Senha inválida.',
                code: 400
            })
        }

        if ( await this.usersCollection.findByEmail(email) ) {
            errors.push({
                message:'Email já utilizado.',
                code: 400
            })
        }
        return {
            valid: errors.length === 0,
            errors
        }

    }

}