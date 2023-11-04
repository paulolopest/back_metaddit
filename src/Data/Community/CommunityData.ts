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
			return await prisma.community.findUnique({
				where: {
					name: name,
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
}
