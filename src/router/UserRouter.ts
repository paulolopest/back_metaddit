import express, { Router } from 'express';
import { UserData } from '../Data/User/UserData';
import { IdGenerator } from '../Services/IdGenerator';
import { HashManager } from '../Services/HashManager';
import { UserBusiness } from '../Business/User/UserBusiness';
import { UserController } from '../Controller/User/UserController';
import { TokenManager } from '../Services/TokenManager';

const userBusiness: UserBusiness = new UserBusiness(
	new UserData(),
	new IdGenerator(),
	new HashManager(),
	new TokenManager()
);
const userController: UserController = new UserController(userBusiness);

export const userRouter: Router = express.Router();

userRouter.post('/signup', userController.signup);
userRouter.get('/login', userController.login);
