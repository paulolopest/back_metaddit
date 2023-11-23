import { User } from '@prisma/client';
import { UserData } from '../../Data/User/UserData';
import { CustomError } from './../../Models/CustomError';
import { IdGenerator } from '../../Services/IdGenerator';
import { HashManager } from './../../Services/HashManager';
import { TokenManager } from '../../Services/TokenManager';
import { CommunityData } from '../../Data/Community/CommunityData';

export class UserBusiness {
	constructor(
		private userData: UserData,
		private idGenerator: IdGenerator,
		private hashManager: HashManager,
		private tokenManager: TokenManager,
		private communityData: CommunityData
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
			const token = this.tokenManager.generate({ id: id });

			await this.userData.signup(id, email, username, hashedPassword, configId);

			return token;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	login = async (credential: string, password: string) => {
		try {
			if (!credential) throw new CustomError(400, 'Invalid credentials');
			if (!password) throw new CustomError(400, 'Enter a password');

			const user: User | null = credential.includes('@')
				? await this.userData.getUserByEmail(credential)
				: await this.userData.getUserByUsername(credential);

			if (!user) throw new CustomError(401, 'Incorrect credentials');

			const verifyPassword: boolean = await this.hashManager.compare(password, user.password);

			if (!verifyPassword) throw new CustomError(401, 'Incorrect password');

			const token = this.tokenManager.generate({ id: user.id });

			return token;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getUser = async (token: string) => {
		try {
			if (!token) throw new CustomError(401, 'Log in first');

			const { id } = this.tokenManager.getTokenData(token);

			const res = await this.userData.getUser(id);

			return res;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	validateToken = async (token: string) => {
		try {
			if (!token) throw new CustomError(400, 'Enter a token');

			const validate = this.tokenManager.getTokenData(token);
			if (!validate) throw new CustomError(401, 'Invalid token, login again');

			return true;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	followCommunity = async (token: string, communityId: string) => {
		try {
			if (!token) throw new CustomError(409, 'Login first');
			if (!communityId) throw new CustomError(400, 'Enter a community id');

			const community = this.communityData.getCommunityById(communityId);
			if (!community) throw new CustomError(404, 'Community not found');

			const user = this.tokenManager.getTokenData(token);

			const checkFollow = await this.userData.findFollow(communityId, user.id);
			if (checkFollow) throw new CustomError(404, 'Community already followed');

			await this.userData.followCommunity(user.id, communityId);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	unfollowCommunity = async (token: string, communityId: string) => {
		try {
			if (!token) throw new CustomError(409, 'Login first');
			if (!communityId) throw new CustomError(400, 'Enter a community id');

			const community = this.communityData.getCommunityById(communityId);
			if (!community) throw new CustomError(404, 'Community not found');

			const { id } = this.tokenManager.getTokenData(token);

			const checkFollow = await this.userData.findFollow(communityId, id);
			if (!checkFollow) throw new CustomError(404, 'Community not followed');

			await this.userData.unfollowCommunity(id, communityId);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getFollowedCommunities = async (token: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');

			const { id } = this.tokenManager.getTokenData(token);

			return await this.userData.getFollowedCommunities(id);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getMyModCommunities = async (token: string) => {
		try {
			if (!token) throw new CustomError(409, 'Login first');

			const { id } = this.tokenManager.getTokenData(token);

			return await this.userData.getMyModCommunities(id);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
