import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middleware/validate-request';

const route = express.Router();

/* route: ticketmarket.dev/api/users/signup
    method: POST
    body: { email: string, password: string }
    return: 201 or 400
*/
route.post(
    '/api/users/signup',
    [
        body('email')
            .isEmail()
            .withMessage('email is invalid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 25 })
            .withMessage('password must be between 4 to 20 characters')
    ],
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        console.log('request came to ticketmarket.dev/api/users/signup');

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log('Email in use');
            return next(new BadRequestError('Email in use'));
        }

        console.log('creating user ...');
        const newUser = User.build({ email, password });
        await newUser.save();

        console.log(`New user ${newUser._id} was created`);

        const userJwt = jwt.sign(
            {
                user: newUser.id,
                email: newUser.email
            },
            process.env.JWT_SECRET! // ! --> tells typescript not to check for null and undefined
        );

        req.session = { jwt: userJwt };

        res.status(201).json(newUser);
    }
);

export { route as signupRoute };