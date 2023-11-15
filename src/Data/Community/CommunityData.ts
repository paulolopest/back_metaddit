import { v4 } from 'uuid';
import { prisma } from '../BaseDatabase';
import { UserData } from './../User/UserData';

type Rules = {
	title: string;
	description: string;
};

export class CommunityData {
	constructor(private userData: UserData) {}

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
					topics: [],
					nsfw: nsfw,
					rules: [],
				},
			});

			await prisma.community_style.create({
				data: {
					id: v4(),
					community_id: id,
				},
			});

			await this.userData.followCommunity(ownerId, id);
			await this.addModerator(v4(), id, ownerId);
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getCommunityById = async (id: string) => {
		try {
			return await prisma.community.findUnique({
				where: {
					id: id,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getCommunityByName = async (name: string) => {
		try {
			const cmt = await prisma.community.findUnique({
				where: {
					name: name,
				},
			});

			return await prisma.community.findUnique({
				where: {
					name: cmt?.name,
				},

				include: {
					_count: {
						select: {
							User_Community_Follow: {
								where: {
									community_id: cmt?.id,
								},
							},
						},
					},

					Community_style: {
						where: {
							community_id: cmt?.id,
						},
					},

					Community_Mods: {
						where: {
							community_id: cmt?.id,
						},
					},
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getCommunityByOwner = async (ownerId: string, communityId: string) => {
		try {
			return prisma.community.findFirst({
				where: {
					id: communityId,

					AND: {
						owner_id: ownerId,
					},
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	addModerator = async (id: string, communityId: string, userId: string) => {
		try {
			await prisma.community_Mods.create({
				data: {
					id: id,
					community_id: communityId,
					user_id: userId,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getMods = async (communityId: string) => {
		try {
			return await prisma.user.findMany({
				where: {
					Community_Mods: {
						some: {
							community_id: communityId,
						},
					},
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getSpecificMod = async (communityId: string, modId: string) => {
		try {
			return await prisma.community_Mods.findFirst({
				where: {
					community_id: communityId,

					AND: {
						user_id: modId,
					},
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
