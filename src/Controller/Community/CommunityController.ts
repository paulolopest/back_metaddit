import { Request, Response } from 'express';
import { CustomError } from './../../Models/CustomError';
import { CommunityBusiness } from '../../Business/Community/CommunityBusiness';

export class CommunityController {
	constructor(private communityBusiness: CommunityBusiness) {}

	createCommunity = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;

			const { name, communityPrivacy, nswf } = req.body;

			await this.communityBusiness.createCommunity(token, name, communityPrivacy, nswf);

			res.status(201).send('Community successfully created');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	addModerator = async (req: Request, res: Response) => {
		try {
			const token = req.headers.authorization as string;
			const { communityId } = req.params;
			const { username } = req.body;

			await this.communityBusiness.addModerator(token, username, communityId);

			res.status(201).send('Moderator successfully added');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getMods = async (req: Request, res: Response) => {
		try {
			const { communityId } = req.params;

			const result = await this.communityBusiness.getMods(communityId);

			res.status(200).send(result);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}
