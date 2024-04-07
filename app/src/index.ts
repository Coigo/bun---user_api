import Elysia from "elysia";
import routes from "./core/user/adapters/controller/UserController";

const app = new Elysia()

app.use(routes)

app.listen(3003, () => {
  console.log('Server is running at port 3003');
})