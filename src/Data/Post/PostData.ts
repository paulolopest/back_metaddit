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
		spoiler?: boolean
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
				} as Prisma.PostCreateInput,
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}
