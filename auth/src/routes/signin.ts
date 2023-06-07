import express from 'express';

const route = express.Router();

/* route: ticketmarket.dev/api/users/signin
    method: POST
    body: { email: string, password: string }
    return: 200 or 401
*/
route.post('/api/users/signin', (req: express.Request, res: express.Response) => {
    res.send('signin');
});

export { route as signinRoute };