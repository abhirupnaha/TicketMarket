import express from 'express';

const route = express.Router();

/* route: ticketmarket.dev/api/users/currentuser
    method: GET
    body: null
    response: info about the user
*/
route.get('/api/users/currentuser', (req: express.Request, res: express.Response) => {
    res.send('currentUser');
});

export { route as currentUserRoute };