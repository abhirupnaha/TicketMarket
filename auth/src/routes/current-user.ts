import express from 'express';

import { currentUser } from '../middleware/current-user';

const route = express.Router();

/* route: ticketmarket.dev/api/users/currentuser
    method: GET
    body: null
    response: info about the user
*/
route.get(
    '/api/users/currentuser',
    currentUser,
    (req: express.Request, res: express.Response) => {
        res.status(200).json({ currentUser: req.currentUser || null })
});

export { route as currentUserRoute };