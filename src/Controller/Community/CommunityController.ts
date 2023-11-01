import { Request, Response } from 'express';
import { CommunityBusiness } from '../../Business/Community/CommunityBusiness';
import { CustomError } from './../../Models/CustomError';

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
}
