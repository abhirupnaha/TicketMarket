import express from 'express';

const route = express.Router();

/* route: ticketmarket.dev/api/users/signout
    method: POST
    body: {}
    response: 200
*/
route.post('/api/users/signout', (req: express.Request, res: express.Response) => {
    res.send('signout');
});

export { route as signoutRoute };