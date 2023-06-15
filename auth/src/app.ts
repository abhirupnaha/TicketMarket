import express, { NextFunction, Request, Response } from 'express';
import cookieSession from 'cookie-session';

import { signinRoute } from './routes/signin';
import { signupRoute } from './routes/signup';
import { currentUserRoute } from './routes/current-user';
import { signoutRoute } from './routes/signout';
import { errorHandler } from './middleware/error-handler';
import { NotFound } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);

app.use(express.json());
// NODE_ENV env varaible is set to test whenever we run jest
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(signupRoute);
app.use(signinRoute);
app.use(currentUserRoute);
app.use(signoutRoute)

app.get('/api/users/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
});

// testing error handling with async function
app.all('*', async (req: Request, res: Response, next: NextFunction) => {
    next(new NotFound());
});

app.use(errorHandler);

export default app;