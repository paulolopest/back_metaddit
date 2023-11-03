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
}
