import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middleware/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';

const route = express.Router();

/* route: ticketmarket.dev/api/users/signin
    method: POST
    body: { email: string, password: string }
    return: 200 or 401
*/
route.post(
    '/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage('invalid email'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('invalid password')
    ],
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        console.log('request came to ticketmarket.dev/api/users/signin');

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser)
            return next(new BadRequestError('Invalid credentails'));

        if (!await Password.compare(existingUser.password.toString(), password))
            return next(new BadRequestError('Invalid credentials'));

        console.log(`${existingUser._id.toString()} is logged in`);

        const userJwt = jwt.sign(
            {
                user: existingUser._id.toString(),
                email: existingUser.email
            },
            process.env.JWT_SECRET! // ! --> tells typescript not to check for null and undefined
        );

        req.session = { jwt: userJwt };
        
        res.sendStatus(200);
    }
);

export { route as signinRoute };