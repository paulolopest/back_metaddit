import { PostData } from '../../Data/Post/PostData';
import { CustomError } from '../../Models/CustomError';
import { TokenManager } from '../../Services/TokenManager';
import { CommunityData } from '../../Data/Community/CommunityData';
import { IdGenerator } from '../../Services/IdGenerator';

export class PostBusiness {
	constructor(
		private postData: PostData,
		private idGenerator: IdGenerator,
		private tokenManager: TokenManager,
		private communityData: CommunityData
	) {}

	addPost = async (
		token: string,
		communityId: string,
		title: string,
		spoiler?: boolean,
		description?: string,
		img?: string
	) => {
		try {
			if (!token) throw new CustomError(401, 'Login first');
			if (!communityId) throw new CustomError(400, 'Enter a communityId');
			if (!title) throw new CustomError(400, 'Enter a title');

			const community = this.communityData.getCommunityById(communityId);
			if (!community) throw new CustomError(404, 'Community not found');

			const user = this.tokenManager.getTokenData(token);

			const checkFollow = await this.communityData.getSpecificFollow(communityId, user.id);
			if (!checkFollow) throw new CustomError(401, 'You must follow the community to post');

			console.log(checkFollow);

			const id: string = this.idGenerator.generate();

			await this.postData.addPost(id, communityId, user.id, title, description, img, spoiler);
		} catch (error: any) {
			if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			}
		}
	};
}
