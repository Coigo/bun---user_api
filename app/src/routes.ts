import Elysia, {t} from "elysia";
import UserController from "./core/user/adapters/controller/UserController";
import { jwt } from '@elysiajs/jwt'

const user = new UserController

const routes = new Elysia()


routes.post('/create', async ({body}) => user.createUser(body), {
    body: t.Object({
        username: t.String(),
        email: t.String(),
    })
})

routes.post('/login', ( {body: { token } } ) => user.login(token), {
    body: t.Object({
        token: t.String(),
    })
})

routes.post('/login_request', ({ body: { email } }) => user.loginRequest(email), {
    body: t.Object({
        email: t.String()
    })
})

export default routes 