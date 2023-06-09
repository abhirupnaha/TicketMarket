import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { RequestValidationError } from '../errors/request-validation-errors';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

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
            .notEmpty()
            .withMessage('email is invalid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 25 })
            .withMessage('password must be between 4 to 20 characters')
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        console.log('request came to ticketmarket.dev/api/users/signup');
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return next(new RequestValidationError(errors.array()));
        }

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log('Email in use');
            return next(new BadRequestError('Email in use'));
        }

        console.log('creating user ...');
        const newUser = User.build({ email, password });
        await newUser.save();

        console.log('following user was created\n', newUser)

        res.status(201).json(newUser);
    }
);

export { route as signupRoute };