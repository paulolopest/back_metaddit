import { v4 } from 'uuid';
import { prisma } from '../BaseDatabase';

export class UserData {
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

	getUserById = async (id: string) => {
		try {
			return await prisma.user.findUnique({
				where: { id },
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	followCommunity = async (userId: string, communityId: string) => {
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

			if (!user || !community) throw new Error('Unexpected error');

			await prisma.user_Community_Follow.create({
				data: {
					id: v4(),
					user_id: userId,
					community_id: communityId,
					user_name: user.username,
					community_name: community.name,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getFollowedCommunities = async (userId: string) => {
		try {
			return await prisma.community.findMany({
				where: {
					User_Community_Follow: {
						some: {
							user_id: userId,
						},
					},
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getMyModCommunities = async (userId: string) => {
		try {
			return await prisma.community.findMany({
				where: {
					Community_Mods: {
						some: {
							user_id: userId,
						},
					},
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
