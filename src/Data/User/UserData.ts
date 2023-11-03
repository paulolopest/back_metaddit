import { prisma } from '../BaseDatabase';

export class UserData {
	getUserByEmail = async (email: string) => {
		try {
			return await prisma.user.findUnique({
				where: { email },
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getUserByUsername = async (username: string) => {
		try {
			return await prisma.user.findUnique({
				where: { username },
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	signup = async (id: string, email: string, username: string, password: string, configId: string) => {
		try {
			await prisma.user.create({
				data: {
					id,
					email,
					username,
					password,
				},
			});

			await prisma.user_config.create({
				data: {
					id: configId,
					user_id: id,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getUser = async (id: string) => {
		try {
			const res = await prisma.user.findUnique({
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
					User_config: true,
				},
				where: { id: id },
			});

			return res;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	followCommunity = async (userId: string, communityId: string, id?: string) => {
		try {
			await prisma.user_Community_Follow.create({
				data: {
					id: id,
					user_id: userId,
					community_id: communityId,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getFollowedCommunities = async (userId: string) => {
		try {
			const followedCommunities = await prisma.community.findMany({
				where: {
					User_Community_Follow: {
						every: {
							user_id: userId,
						},
					},
				},
			});

			return followedCommunities;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
