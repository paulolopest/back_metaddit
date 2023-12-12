import { Request, Response } from 'express';
import { CustomError } from './../../Models/CustomError';
import { CommunityBusiness } from '../../Business/Community/CommunityBusiness';

export class CommunityController {
	constructor(private communityBusiness: CommunityBusiness) {}

	createCommunity = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
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

	addFlag = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;

			const { communityId } = req.params;
			const { flag, color } = req.body;

			await this.communityBusiness.addFlag(token, communityId, flag, color);

			res.status(200).send('Flag successfully added');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	removeFlag = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;

			const { communityId } = req.params;
			const { flag } = req.body;

			await this.communityBusiness.removeFlag(token, communityId, flag);

			res.status(200).send('Flag successfully removed');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	addRule = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;

			const { communityId } = req.params;
			const { title, description } = req.body;

			await this.communityBusiness.addRule(token, communityId, title, description);

			res.status(200).send('Rule successfully added');
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
			const token: string = req.headers.authorization as string;
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

			const result: Array<Object> = await this.communityBusiness.getMods(communityId);

			res.status(200).send(result);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getCMTByName = async (req: Request, res: Response) => {
		try {
			const { name } = req.params;

			const result: Object = await this.communityBusiness.getCMTByName(name);

			res.status(200).send(result);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	verifyMod = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { communityName } = req.params;

			await this.communityBusiness.verifyMod(token, communityName);

			res.status(200).send('Mod verified');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	addDescription = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;

			const { communityId } = req.params;
			const { description } = req.body;

			await this.communityBusiness.addDescription(token, communityId, description);

			res.status(200).send('Description successfully added');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getPost = async (req: Request, res: Response) => {
		try {
			const { communityId, order, by, at } = req.params;

			const result = await this.communityBusiness.getPost(communityId, order, by, at);

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
