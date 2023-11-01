import { prisma } from '../BaseDatabase';

type Rules = {
	title: string;
	description: string;
};

export class CommunityData {
	createCommunity = async (
		id: string,
		ownerId: string,
		name: string,
		communityPrivacy: any,
		nsfw: boolean | undefined
	) => {
		try {
			await prisma.community.create({
				data: {
					id: id,
					owner_id: ownerId,
					name: name,
					type: communityPrivacy,
					mods_id: [ownerId],
					topics: [],
					nsfw: nsfw,
					banned_user: [],
					rules: [],
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
