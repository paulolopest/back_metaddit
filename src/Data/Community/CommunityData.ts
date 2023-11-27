import { v4 } from 'uuid';
import { prisma } from '../BaseDatabase';
import { UserData } from './../User/UserData';

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

	addFlag = async (communityId: string, flagName: string, color: string) => {
		try {
			await prisma.community.update({
				where: {
					id: communityId,
				},

				data: {
					flags: {
						push: {
							flag: flagName,
							color: color,
						},
					},
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	removeFlag = async (communityId: string, newArray: Array<object>) => {
		try {
			await prisma.community.update({
				where: {
					id: communityId,
				},

				data: {
					flags: {
						set: newArray,
					},
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	addRule = async (communityId: string, title: string, description: string) => {
		try {
			await prisma.community.update({
				where: {
					id: communityId,
				},

				data: {
					rules: {
						push: {
							title: title,
							description: description,
						},
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
						name: name,
					},

					select: {
						id: true,
						owner_id: true,
						name: true,
						bio: true,
						banner_img: true,
						profile_img: true,
						language: true,
						country: true,
						type: true,
						primary_topic: true,
						topics: true,
						nsfw: true,
						created_at: true,
						rules: true,
						flags: true,
						Community_style: true,
						Community_Mods: true,
						_count: {
							select: {
								User_Community_Follow: {
									where: {
										community_name: cmt.id,
									},
								},
								Post: {
									where: {
										community_id: cmt.id,
									},
								},
							},
						},
					},
				});
			} else {
				throw new Error('Community not found');
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

	getSpecificFollow = async (communityId: string, userId: string) => {
		try {
			return await prisma.user_Community_Follow.findFirst({
				where: {
					community_id: communityId,

					AND: {
						user_id: userId,
					},
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getPost = async (communityId: string) => {
		try {
			const result = await prisma.post.findMany({
				where: {
					community_id: communityId,
				},

				include: {
					user: {
						select: {
							username: true,
						},
					},
				},
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
