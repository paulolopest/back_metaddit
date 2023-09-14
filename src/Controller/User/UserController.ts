import { Request, Response } from 'express';
import { CustomError } from './../../Models/CustomError';
import { UserBusiness } from '../../Business/User/UserBusiness';

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

	login = async (req: Request, res: Response) => {
		try {
			const { credential, password } = req.body;

			const login = await this.userBusiness.login(credential, password);

			res.status(200).send(login);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}
