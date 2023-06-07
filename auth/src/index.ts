import express, { Request, Response } from 'express';

import { signinRoute } from './routes/signin';
import { signoutRoute } from './routes/signout';
import { signupRoute } from './routes/signup';
import { currentUserRoute } from './routes/current-user';
import { errorHandler } from './middleware/error-handler';

const app = express();

app.use(express.json());

app.use(signupRoute);
app.use(signinRoute);
app.use(signoutRoute);
app.use(currentUserRoute);

app.get('/api/users/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
});

app.use(errorHandler);

app.listen(3000, () => {
    console.log('auth server running at port 3000!');
});