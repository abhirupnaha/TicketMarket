import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { RequestValidationError } from '../errors/request-validation-errors';
import { DatabaseConnectionError } from '../errors/database-connection-error';

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
    (req: Request, res: Response) => {
        console.log('request came to ticketmarket.dev/api/users/signup');
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;

        console.log(`creating user ${email} ...`);
        
        throw new DatabaseConnectionError(errors.array());

        res.status(201).json({ message: `${email} user was created`});
    }
);

export { route as signupRoute };