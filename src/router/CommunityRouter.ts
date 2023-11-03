import express, { Router } from 'express';
import { IdGenerator } from '../Services/IdGenerator';
import { TokenManager } from '../Services/TokenManager';
import { CommunityData } from '../Data/Community/CommunityData';
import { CommunityBusiness } from '../Business/Community/CommunityBusiness';
import { CommunityController } from './../Controller/Community/CommunityController';
import { UserData } from '../Data/User/UserData';

const communityBusiness: CommunityBusiness = new CommunityBusiness(
	new CommunityData(new UserData()),
	new IdGenerator(),
	new TokenManager()
);
const communityController: CommunityController = new CommunityController(communityBusiness);

export const communityRouter: Router = express.Router();

// Routes

communityRouter.post('/community/create', communityController.createCommunity);
