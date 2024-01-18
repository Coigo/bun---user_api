import User from "../../domain/User";
import { UsersRepository } from "../../domain/UsersRepository";

export default class UserCollection implements UsersRepository{

    static readonly users: User[] = []

    async create ( newUser: User ): Promise<User> {
        UserCollection.users.push(newUser)
        console.log('usuario criado:', UserCollection.users);
        
        return newUser
    }

    async findByEmail (email: string): Promise< User| undefined> {

        console.log('eu to aqui em cima', email);
        
        return UserCollection.users.find(user => user.email === email)
    }

    public async clear () {
        while (UserCollection.users.length > 0) {
            UserCollection.users.pop();
          }
    }

}