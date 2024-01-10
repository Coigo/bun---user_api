interface newUser  {
    username: string
    password: string
}

interface ICreateUser {
    rCreate: ()
    create: ( newUser: newUser ) => Promise<boolean>
}

export class CreateUser implements ICreateUser  {

    private rCreate

    public async create ( newUser: newUser ) {
        return true
    }

}