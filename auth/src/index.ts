import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
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
app.use(cookieSession({
    signed: false,
    secure: true
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

const start = async () => {
    if (!process.env.JWT_SECRET)
        throw new Error('JWT_SECRET key is missing');

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('connected to mongodb');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('auth server running at port 3000!!!');
    });
}

start();