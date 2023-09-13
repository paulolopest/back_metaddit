import express, { Router } from 'express';
import { UserController } from '../Controller/User/UserController';
import { UserBusiness } from '../Business/User/UserBusiness';
import { UserData } from '../Data/User/UserData';
import { IdGenerator } from '../Services/IdGenerator';
import { HashManager } from '../Services/HashManager';

const userBusiness: UserBusiness = new UserBusiness(new UserData(), new IdGenerator(), new HashManager());
const userController: UserController = new UserController(userBusiness);

export const userRouter: Router = express.Router();

userRouter.post('/signup', userController.signup);
