import CreateUser from "./core/user/application/CreateUser";
import LoginUser from "./core/user/application/LoginUser";
import UserCollection from "./core/user/adapters/repository/UserColection";
import Crypto from "./core/user/adapters/geral/CryptoPassword";



const create = new CreateUser(new Crypto, new UserCollection)
await create.handle({
  email:'eumesmo@sim.com',
  username:'aaaa',
  password:'aaaa'
})


const login = new LoginUser(new Crypto, new UserCollection)
const user = await login.handle({
  email:'eaaaaaaaaaaaaaaumesmo@sim.com',
  password:'aaaa'
})


console.log(user);


