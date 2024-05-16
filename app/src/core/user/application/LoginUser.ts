import type { error } from "../../shared/Errors";
import type UseCase from "../../shared/UseCase";
import { CryptoPassword } from "../domain/CryptoPasswordProvider";
import User from "../domain/User";
import type { UsersRepository } from "../domain/UsersRepository";
import UserCollection from "../adapters/tmp/tmp_UserRepository";
import type { MailerProvider } from "../domain/Mailer";
import dotenv from "dotenv";
import type { JwtProvider } from "../domain/Jwt";
import type { LoginType, TokenType } from "../domain/PassKey";

dotenv.config();

export default class LoginUser
	implements UseCase<LoginType, { jwt: string | undefined;  user: User| undefined; errors: error[] }>
{
	private mailer;
	private jwt;
	private usersRepository;

	constructor(
		mailer: MailerProvider,
		usersRepository: UsersRepository,
		jwt: JwtProvider,
	) {
		this.mailer = mailer;
		this.usersRepository = usersRepository;
		this.jwt = jwt;
	}

	private notFoundTokenResponse = {
		errors: [
			{
				message: "Invalid Token",
				code: 400,
			},
		],
		jwt: undefined,
		user:undefined
	};
	private notFoundUserResponse = {
		errors: [
			{
				message: "User not found",
				code: 400,
			},
		],
		jwt: undefined,
		user:undefined
	};

	async handle(
		{passKey, email}: LoginType,
	): Promise<{ jwt: string | undefined;  user: User| undefined; errors: error[] }> {
		try {

			const findToken = await this.usersRepository.findToken({passKey, email});

			if (!findToken) return this.notFoundTokenResponse;
            const { valid, errors } = this.isTokenValid(findToken);
            
			if (valid) {
                const user = await this.usersRepository.findByEmail(findToken.email);
                if (!user) return this.notFoundTokenResponse;
    
                this.usersRepository.deleteUsedToken(findToken.id);
                const jwt = this.jwt.sign(user);
                return {
                    errors,
                    jwt,
					user
                };
            }
            return {
                errors, jwt: undefined, user: undefined
            }

		} catch (err) {
			return {
				errors: [
					{
						message: "Server error!",
						code: 500,
					},
				],
				jwt: undefined,
				user:undefined

			};
		}
	}

	private isTokenValid(tokenDTO: TokenType) {
		const errors: error[] = [];

		if (!tokenDTO || !tokenDTO.createdAt || !tokenDTO.passKey) {
			errors.push({
				code: 400,
				message: "Token not found",
			});
		}
		const { createdAt, valid } = tokenDTO;

		if (!this.validateTokenLife(createdAt) || !this.haveTokenBeenUsed(valid)) {
			errors.push({
				code: 400,
				message: "Invalid Token",
			});
		}
		return {
			valid: errors.length === 0,
			errors,
		};
	}

	private haveTokenBeenUsed(valid: number) {
		if (valid === 0) {
			return false;
		}
		return true;
	}

	private validateTokenLife(createdAt: Date) {
		const now = new Date();

		const tokenBirth = new Date(createdAt);
		const minuteDiff = (now.getTime() - tokenBirth.getTime()) / 1000 / 60;
		
		const tokenMaxLife = Number(process.env.token_max_life);
		if (minuteDiff > tokenMaxLife) return false;

		return true;
	}
}
