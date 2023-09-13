import * as jwt from 'jsonwebtoken';
import { CustomError } from '../Models/CustomError';
import { AuthenticationData } from '../Models/AuthenticationData';

export class TokenManager {
	generate = (id: AuthenticationData): string => {
		return jwt.sign(
            id, 
            process.env.TOKEN_SECRET_KEY as jwt.Secret, 
            {expiresIn: process.env.TOKEN_EXPIRES}
        );
	};

	getTokenData = (token: string): AuthenticationData => {
		try {
			return jwt.verify(
				token,
				process.env.TOKEN_SECRET_KEY as jwt.Secret
			) as AuthenticationData;
		} catch (error: any) {
			if (error.name === 'TokenExpiredError') {
				throw new CustomError(409, 'Expired token, login again');
			} else if (error.name === 'JsonWebTokenError') {
				throw new CustomError(409, 'Invalid token, login again');
			} else {
				throw new CustomError(404, 'Unknown validation error, login again');
			}
		}
	};
}
