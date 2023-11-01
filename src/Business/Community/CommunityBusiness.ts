import { CommunityData } from '../../Data/Community/CommunityData';
import { TokenManager } from '../../Services/TokenManager';
import { CustomError } from './../../Models/CustomError';
import { IdGenerator } from './../../Services/IdGenerator';

export class CommunityBusiness {
	constructor(
		private communityData: CommunityData,
		private idGenerator: IdGenerator,
		private tokenManager: TokenManager
	) {}

	createCommunity = async (token: string, name: string, communityPrivacy: string, nsfw?: boolean) => {
		try {
			if (!token) throw new CustomError(409, 'Login first');
			if (!name) throw new CustomError(400, 'Enter a community name');
			if (!communityPrivacy) throw new CustomError(400, 'Enter a community privacy type');

			const id = this.idGenerator.generate();
			const user = this.tokenManager.getTokenData(token);

			await this.communityData.createCommunity(id, user.id, name, communityPrivacy, nsfw);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
