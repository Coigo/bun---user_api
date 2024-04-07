import { validate } from "../../../../util";
import CreateUser from "../../application/CreateUser";
import LoginUser from "../../application/LoginUser";
import type User from "../../domain/User";
import MagicLink from "../geral/MagicLink";
import Jwt from "../geral/Jwt";
import Mailer from "../geral/Mailer";
import UserRepository from "../repository/UserRepository";
import LoginRequest from "../../application/LoginRequest";
import Elysia, { t } from "elysia";

const routes = new Elysia();

routes.post(
	"/create",
	async ({ body, set }) => {
		const createUser = new CreateUser(
			new MagicLink(),
			new Mailer(),
			new UserRepository(),
		);
		const { user, errors } = await createUser.handle(body);
		if (errors[0]) {
			set.status = errors[0].code;
			return {
				errors,
			};
		}
		return user;
	},
	{
		body: t.Object({
			username: t.String(),
			email: t.String(),
		}),
	},
);

routes.post(
	"login_request",
	async ({ body: { email }, set }) => {
		const request = new LoginRequest(
			new MagicLink(),
			new Mailer(),
			new UserRepository(),
		);
		const { user, errors } = await request.handle(email);
		if (errors[0]) {
			set.status = errors[0].code;
			return {
				errors,
			};
		}
		return user;
	},
	{
		body: t.Object({
			email: t.String(),
		}),
	},
);

routes.post(
	"/login",
	async ({ body: { token }, set }) => {
		const login = new LoginUser(new Mailer(), new UserRepository(), new Jwt());
		const { jwt, errors } = await login.handle(token);
		if (errors[0]) {
			set.status = errors[0].code;
			return {
				errors,
			};
		}
		return jwt;
	},
	{
		body: t.Object({
			token: t.String(),
		}),
	},
);

export default routes;
