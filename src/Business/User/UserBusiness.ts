import { User } from '@prisma/client';
import { UserData } from '../../Data/User/UserData';
import { CustomError } from './../../Models/CustomError';
import { IdGenerator } from '../../Services/IdGenerator';
import { HashManager } from './../../Services/HashManager';

export class UserBusiness {
	constructor(
		private userData: UserData,
		private idGenerator: IdGenerator,
		private hashManager: HashManager
	) {}

	signup = async (email: string, username: string, password: string) => {
		try {
			if (!email) throw new CustomError(400, 'Enter an email');
			if (!username) throw new CustomError(400, 'Enter an username');
			if (!password) throw new CustomError(400, 'Enter an password');
			if (password.length < 8) throw new CustomError(400, 'Password must contain at least 8 characters');
			if (!email.includes('@')) throw new CustomError(400, 'Enter a valid email');

			const verifyEmail: User | null = await this.userData.getUserByEmail(email);
			const verifyUsername: User | null = await this.userData.getUserByUsername(username);

			if (verifyEmail) throw new CustomError(409, 'Email already registered');
			if (verifyUsername) throw new CustomError(409, 'Username already registered');

			const id: string = this.idGenerator.generate();
			const configId: string = this.idGenerator.generate();
			const hashedPassword: string = await this.hashManager.generate(password);

			await this.userData.signup(id, email, username, hashedPassword, configId);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
