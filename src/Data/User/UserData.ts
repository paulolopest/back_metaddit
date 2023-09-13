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
}
