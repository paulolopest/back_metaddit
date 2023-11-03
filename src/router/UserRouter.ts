import express, { Router } from 'express';
import { UserData } from '../Data/User/UserData';
import { IdGenerator } from '../Services/IdGenerator';
import { HashManager } from '../Services/HashManager';
import { TokenManager } from '../Services/TokenManager';
import { UserBusiness } from '../Business/User/UserBusiness';
import { CommunityData } from '../Data/Community/CommunityData';
import { UserController } from '../Controller/User/UserController';

const userBusiness: UserBusiness = new UserBusiness(
	new UserData(),
	new IdGenerator(),
	new HashManager(),
	new TokenManager(),
	new CommunityData(new UserData())
);
const userController: UserController = new UserController(userBusiness);

export const userRouter: Router = express.Router();

//Routes

userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.post('/user/validate-token', userController.validateToken);

userRouter.get('/profile', userController.getUser);
userRouter.get('/profile/followed/communities', userController.getFollowedCommunities);

userRouter.post('/user/follow/community/:communityId', userController.followCommunity);
