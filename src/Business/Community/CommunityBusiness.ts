import { CustomError } from './../../Models/CustomError';
import { TokenManager } from '../../Services/TokenManager';
import { IdGenerator } from './../../Services/IdGenerator';
import { CommunityData } from '../../Data/Community/CommunityData';
import { UserData } from '../../Data/User/UserData';

export class CommunityBusiness {
	constructor(
		private communityData: CommunityData,
		private idGenerator: IdGenerator,
		private tokenManager: TokenManager,
		private userData: UserData
	) {}

	createCommunity = async (token: string, name: string, communityPrivacy: string, nsfw?: boolean) => {
		try {
			if (!token) throw new CustomError(409, 'Login first');
			if (!name) throw new CustomError(400, 'Enter a community name');
			if (!communityPrivacy) throw new CustomError(400, 'Enter a community privacy type');

			const id = this.idGenerator.generate();
			const user = this.tokenManager.getTokenData(token);

			const verifyName = await this.communityData.getCommunityByName(name);
			if (verifyName) throw new CustomError(409, 'Community name already in use');

			await this.communityData.createCommunity(id, user.id, name, communityPrivacy, nsfw);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	addModerator = async (token: string, username: string, communityId: string) => {
		try {
			if (!token) throw new CustomError(409, 'Login first');
			if (!username) throw new CustomError(400, 'Enter an username');
			if (!communityId) throw new CustomError(400, 'Enter a community id');

			const userTest = await this.userData.getUserByUsername(username);
			if (!userTest) throw new CustomError(404, 'User not found');

			const loggedUser = this.tokenManager.getTokenData(token);

			const verifyOwner = await this.communityData.getCommunityByOwner(loggedUser.id, communityId);
			if (!verifyOwner) throw new CustomError(409, 'Error on request');

			const id = this.idGenerator.generate();

			await this.communityData.addModerator(id, communityId, userTest.id);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	getMods = async (communityId: string) => {
		try {
			if (!communityId) throw new CustomError(400, 'Enter a community id');

			const community = this.communityData.getCommunityById(communityId);

			if (!community) throw new CustomError(404, 'Community not found');

			return await this.communityData.getMods(communityId);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
