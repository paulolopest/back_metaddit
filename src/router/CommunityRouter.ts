import express, { Router } from 'express';
import { UserData } from '../Data/User/UserData';
import { IdGenerator } from '../Services/IdGenerator';
import { TokenManager } from '../Services/TokenManager';
import { CommunityData } from '../Data/Community/CommunityData';
import { CommunityBusiness } from '../Business/Community/CommunityBusiness';
import { CommunityController } from './../Controller/Community/CommunityController';

const communityBusiness: CommunityBusiness = new CommunityBusiness(
	new CommunityData(new UserData()),
	new IdGenerator(),
	new TokenManager(),
	new UserData()
);
const communityController: CommunityController = new CommunityController(communityBusiness);

export const communityRouter: Router = express.Router();

// Routes

communityRouter.post('/community/create', communityController.createCommunity);
communityRouter.post('/community/:communityId/mod/add', communityController.addModerator);
communityRouter.post('/community/:communityId/description/add', communityController.addDescription);
communityRouter.post('/community/:communityId/flag/add', communityController.addFlags);

communityRouter.get('/community/:communityId/get/mods', communityController.getMods);
communityRouter.get('/community/:name', communityController.getCMTByName);
communityRouter.get('/community/:communityName/mod/verify', communityController.verifyMod);
