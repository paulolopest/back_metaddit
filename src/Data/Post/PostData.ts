import { Prisma } from '@prisma/client';
import { prisma } from '../BaseDatabase';

export class PostData {
	addPost = async (
		id: string,
		communityId: string,
		userId: string,
		title: string,
		description?: string,
		img?: string,
		spoiler?: boolean,
		flag?: string,
		nsfw?: boolean
	) => {
		try {
			await prisma.post.create({
				data: {
					id,
					community: { connect: { id: communityId } },
					user: { connect: { id: userId } },
					title,
					description,
					img,
					spoiler,
					flags: flag,
					nsfw,
				} as Prisma.PostCreateInput,
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getPostById = async (id: string) => {
		try {
			return await prisma.post.findUnique({
				where: { id },
				select: {
					id: true,
					community_id: true,
					user_id: true,
					title: true,
					description: true,
					img: true,
					created_at: true,
					updated_at: true,
					votes: true,
					spoiler: true,
					flags: true,
					_count: {
						select: {
							Comment: true,
						},
					},
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
