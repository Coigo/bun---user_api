import type UseCase from "../../shared/UseCase";

import type User from "../domain/User";
import type { UsersRepository } from "../domain/UsersRepository";
import UserCollection from "../adapters/tmp/tmp_UserRepository";
import type { error } from "../../shared/Errors";
import type { MailerProvider } from "../domain/Mailer";
import dotenv from "dotenv";
import type { IPassKey } from "../domain/PassKey";
import { users } from "../../../infrastructure/schema/schema";

dotenv.config();

interface ResponseUser {
	user: User
}
interface ResponseError {
	errors: error[]
}

export default class CreateUser
	implements UseCase<User, ResponseUser | ResponseError>
{
	private mailer: MailerProvider;
	private magicNumber: IPassKey;
	private usersCollection: UsersRepository;

	constructor(
		magicNumber: IPassKey,
		mailer: MailerProvider,
		usersCollection: UsersRepository,
	) {
		this.mailer = mailer;
		this.usersCollection = usersCollection;
		this.magicNumber = magicNumber;
	}

	public async handle( user: User): Promise<ResponseUser | ResponseError> {
		const { valid, errors } = await this.validateNewUser(user);

		if (valid) {
			const createdUser = await this.usersCollection.create(user);
			const passKey = this.magicNumber.generateKey();

			await this.usersCollection.saveToken({
				email: user.email,
				passKey
			});
			await this.mailer.mailMagicLink({
				address: user.email,
				passKey
			});
			return { user: createdUser }
		}

		return { errors };
	}

	private async validateNewUser(newUser: User) {
		const errors: error[] = [];
		const { email } = newUser;

		const findEmail = await this.usersCollection.findByEmail(email)
		
		if (findEmail) {
			errors.push({
				message: "Email já utilizado.",
				code: 400,
			});
		}
		return {
			valid: errors.length === 0,
			errors,
		};
	}
}
