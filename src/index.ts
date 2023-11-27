import cors from 'cors';
import express, { Express } from 'express';
import { userRouter } from './router/UserRouter';
import { postRouter } from './router/PostRouter';
import { communityRouter } from './router/CommunityRouter';

const port: number = 3000;
const app: Express = express();

app.use(express.json());
app.use(cors());

const server = app.listen(port, () => {
	if (server) {
		console.log(`The server is running on localhost:${port}`);
	} else {
		console.log('Error running the server');
	}
});

// Route

app.use(userRouter);
app.use(postRouter);
app.use(communityRouter);
