import type { error } from "../../shared/Errors";
import type UseCase from "../../shared/UseCase";
import type { IMagicLink } from "../domain/MagicLink";
import type { MailerProvider } from "../domain/Mailer";
import type User from "../domain/User";
import type { UsersRepository } from "../domain/UsersRepository";

export default class LoginRequest
	implements UseCase<string, { user: User | undefined; errors: error[] }>
{
	private mailer;
	private magicLink;
	private userRepository;

	constructor(
		magicLink: IMagicLink,
		mailer: MailerProvider,
		userRepository: UsersRepository,
	) {
		this.magicLink = magicLink;
		this.mailer = mailer;
		this.userRepository = userRepository;
	}

	public async handle(
		email: string,
	): Promise<{ user: User | undefined; errors: error[] }> {
		const { user, errors } = await this.findUser(email);
		if (!user) {
			return {
				user,
				errors,
			};
		}
		const token = this.magicLink.generateUUID();
		const saveToken = await this.userRepository.saveToken({ email, token });

		const mail = await this.mailer.mailMagicLink({
			address: user.email,
			link: `${process.env.suve_url}/login/${token}`,
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
