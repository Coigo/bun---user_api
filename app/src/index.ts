import CreateUser from "./user/application/CreateUser";
import LoginUser from "./user/application/LoginUser";
import UserCollection from "./user/repository/UserColection";
import Crypto from "./user/application/CryptoPassword";



const create = new CreateUser(new Crypto, new UserCollection)
await create.handle({
  email:'eumesmo@sim.com',
  username:'aaaa',
  password:'aaaa'
})


const login = new LoginUser(new Crypto, new UserCollection)
const user = await login.handle({
  email:'eumesmo@sim.com',
  password:'aaaa'
})


console.log(user);


