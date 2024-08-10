import { expect, expectTypeOf, test, it } from "vitest";
import CreateUser from "./CreateUser";
import UserCollection from "../adapters/tmp/tmp_UserRepository";
import type { error } from "../../shared/Errors";
import PassKey from "../adapters/tmp/tmp_PassKey";
import Mailer from "../adapters/tmp/tmp_Mailer";
import UserRepository from "../adapters/tmp/tmp_UserRepository";

const newUser = {
	email: "teste@teste.com",
	username: "user",
};

it("Should be possible to create a new user", async () => {
	new UserCollection().clear();
	const create = new CreateUser(
		new PassKey(),
		new Mailer(),
		new UserRepository(),
	);

	const result = await create.handle(newUser);
	if ('user' in result) {
		expect(result.user).toEqual(newUser);
	}
	else {
		expect(result.errors).toEqual([]);
	}
});

it("Should not be possible to create two accounts with the same email", async () => {
	new UserCollection().clear();
	const create = new CreateUser(
		new PassKey(),
		new Mailer(),
		new UserRepository(),
	);

	const errorExpected: error[] = [
		{
			message: "Email já utilizado.",
			code: 400,
		},
	];

	await create.handle(newUser);

	const result = await create.handle(newUser);
	if ('errors' in result) {
		expect(result.errors).toEqual(errorExpected);
	}
	else {
		expect(result.user).toEqual(newUser);
	}
});
