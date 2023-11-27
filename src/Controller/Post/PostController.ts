import { Request, Response } from 'express';
import { CustomError } from '../../Models/CustomError';
import { PostBusiness } from '../../Business/Post/PostBusiness';

export class PostController {
	constructor(private postBusiness: PostBusiness) {}

	addPost = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { communityId } = req.params;
			const { title, description, img, spoiler } = req.body;

			await this.postBusiness.addPost(token, communityId, title, spoiler, description, img);

			res.status(201).send('Post successfully created');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}
