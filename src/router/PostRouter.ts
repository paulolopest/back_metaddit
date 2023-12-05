import express, { Router } from 'express';
import { UserData } from '../Data/User/UserData';
import { PostData } from './../Data/Post/PostData';
import { IdGenerator } from './../Services/IdGenerator';
import { TokenManager } from './../Services/TokenManager';
import { PostBusiness } from './../Business/Post/PostBusiness';
import { CommunityData } from './../Data/Community/CommunityData';
import { PostController } from './../Controller/Post/PostController';

const postBusiness: PostBusiness = new PostBusiness(
	new PostData(),
	new IdGenerator(),
	new TokenManager(),
	new CommunityData(new UserData())
);
const postController: PostController = new PostController(postBusiness);

export const postRouter: Router = express.Router();

//Routes

postRouter.post('/post/add/:communityId', postController.addPost);

postRouter.get('/post/:id', postController.getPostById);
