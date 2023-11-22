import { v4 } from 'uuid';
import { prisma } from '../BaseDatabase';
import { UserData } from './../User/UserData';

type Rules = {
	title: string;
	description: string;
};

export class CommunityData {
	constructor(private userData: UserData) {}

	addModerator = async (id: string, communityId: string, userId: string) => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
			});
			const community = await prisma.community.findUnique({
				where: {
					id: communityId,
				},
			});

			if (user && community) {
				await prisma.community_Mods.create({
					data: {
						id: id,
						community_id: communityId,
						user_id: userId,
						user_name: user.username,
						community_name: community.name,
					},
				});
			} else {
				throw new Error('Unexpected error on add the administrator');
			}
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

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

	addDescription = async (communityId: string, description: string) => {
		try {
			await prisma.community.update({
				where: {
					id: communityId,
				},

				data: {
					bio: description,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	addFlags = async (communityId: string, flagName: string, color: string) => {
		try {
			const flag: any = { flag: flagName, color: color };

			await prisma.community.update({
				where: {
					id: communityId,
				},

				data: {
					flags: {
						set: [
							{
								flag: flagName,
								color: color,
							},
						],
					},
				},
			});
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

			if (cmt) {
				return await prisma.community.findUnique({
					where: {
						name: cmt.name,
					},

					include: {
						_count: {
							select: {
								User_Community_Follow: {
									where: {
										community_id: cmt.id,
									},
								},

								Post: {
									where: {
										community_id: cmt.id,
									},
								},
							},
						},

						Community_style: {
							where: {
								community_id: cmt.id,
							},
						},

						Community_Mods: {
							where: {
								community_id: cmt.id,
							},
						},
					},
				});
			}
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

	getMods = async (communityId: string) => {
		try {
			return await prisma.user.findMany({
				select: {
					id: true,
					email: true,
					username: true,
					password: false,
					bio: true,
					birthday: true,
					created_at: true,
					banner_img: true,
					profile_img: true,
					karma: true,
				},
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
