import { UserData } from '../../Data/User/UserData';
import { CustomError } from './../../Models/CustomError';
import { TokenManager } from '../../Services/TokenManager';
import { IdGenerator } from './../../Services/IdGenerator';
import { CommunityData } from '../../Data/Community/CommunityData';
import { AuthenticationData } from '../../Models/AuthenticationData';

export class CommunityBusiness {
	constructor(
		private communityData: CommunityData,
		private idGenerator: IdGenerator,
		private tokenManager: TokenManager,
		private userData: UserData
	) {}

	createCommunity = async (token: string, name: string, communityPrivacy: string, nsfw?: boolean) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!name) throw new CustomError(400, 'Enter a community name');
			if (!communityPrivacy) throw new CustomError(400, 'Enter a community privacy type');

			const id: string = this.idGenerator.generate();
			const user: AuthenticationData = this.tokenManager.getTokenData(token);

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

	addDescription = async (token: string, communityId: string, description: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!communityId) throw new CustomError(400, 'Enter a community id');
			if (!description) throw new CustomError(400, 'Enter a description');
			if (description.length > 255) {
				throw new CustomError(413, 'Description must contain a maximum of 255 characters');
			}

			const community = await this.communityData.getCommunityById(communityId);
			if (!community) throw new CustomError(404, 'Community not found');

			const { id } = this.tokenManager.getTokenData(token);

			const checkMod = await this.communityData.getSpecificMod(community.id, id);
			if (!checkMod) throw new CustomError(403, 'Only mods can update community data');

			await this.communityData.addDescription(communityId, description);
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
			if (!token) throw new CustomError(401, 'Login first');
			if (!username) throw new CustomError(400, 'Enter an username');
			if (!communityId) throw new CustomError(400, 'Enter a community id');

			const userTest = await this.userData.getUserByUsername(username);
			if (!userTest) throw new CustomError(404, 'User not found');

			const loggedUser: AuthenticationData = this.tokenManager.getTokenData(token);

			const verifyOwner = await this.communityData.getCommunityByOwner(loggedUser.id, communityId);
			if (!verifyOwner) throw new CustomError(409, 'Error on request');

			const id: string = this.idGenerator.generate();

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

	getCMTByName = async (name: string) => {
		try {
			if (!name) throw new CustomError(400, 'Enter a name');

			const community = await this.communityData.getCommunityByName(name);

			if (!community) throw new CustomError(404, 'Community not found');

			return community;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};

	verifyMod = async (token: string, communityName: string) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!communityName) throw new CustomError(400, 'Enter a community name');

			const community = await this.communityData.getCommunityByName(communityName);
			const user: AuthenticationData = this.tokenManager.getTokenData(token);

			if (!community) throw new CustomError(404, 'Community not found');

			const check = await this.communityData.getSpecificMod(community.id, user.id);

			if (!check) throw new CustomError(403, 'Permission denied');

			return check;
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
