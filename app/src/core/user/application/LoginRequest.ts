import type { error } from "../../shared/Errors";
import type UseCase from "../../shared/UseCase";
import type { IPassKey } from "../domain/PassKey";
import type { MailerProvider } from "../domain/Mailer";
import type User from "../domain/User";
import type { UsersRepository } from "../domain/UsersRepository";

export default class LoginRequest
	implements UseCase<string, { user: User | undefined; errors: error[] }>
{
	private mailer;
	private passKey;
	private userRepository;

	constructor(
		passKey: IPassKey,
		mailer: MailerProvider,
		userRepository: UsersRepository,
	) {
		this.passKey = passKey;
		this.mailer = mailer;
		this.userRepository = userRepository;
	}

	public async handle( email: string): Promise<{ user: User | undefined; errors: error[] }> {
		console.log(email);

		const { user, errors } = await this.findUser(email);
		if (!user) {
			return {
				user,
				errors,
			};
		}
		const passKey = this.passKey.generateKey();
		const saveToken = await this.userRepository.saveToken({ email, passKey });
		const mail = await this.mailer.mailMagicLink({
			address: user.email,
			passKey,
		});

		return { user, errors };
	}

	private async findUser(email: string) {
		const errors: error[] = [];

		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			errors.push({
				code: 400,
				message: "Email nao encontrado",
			});
		}

		return {
			user,
			errors,
		};
	}
}
