import { Request, Response } from 'express';
import { UserBusiness } from '../../Business/User/UserBusiness';
import { CustomError } from './../../Models/CustomError';

export class UserController {
	constructor(private userBusiness: UserBusiness) {}

	signup = async (req: Request, res: Response) => {
		try {
			const { email, username, password } = req.body;

			await this.userBusiness.signup(email, username, password);

			res.status(201).send('User created');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}
