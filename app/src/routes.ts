import Elysia, {t} from "elysia";
import UserController from "./core/user/adapters/controller/UserController";

const user = new UserController

const routes = new Elysia()


routes.post('/create', async ({body}) => user.createUser(body), {
    body: t.Object({
        username: t.String(),
        email: t.String(),
    })
})

routes.get('/login/:token', ({params: {token}}) => user.login(token))

export default routes 