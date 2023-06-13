import express, { Request, Response } from 'express';
import { verify} from 'jsonwebtoken';

const route = express.Router();

route.post('/api/users/signout', (req: Request, res: Response) => {
    if (!req.session?.jwt)
        return res.sendStatus(200);

    try {
        const payload = verify(
            req.session.jwt,
            process.env.JWT_SECRET!
        );

        req.session = null;

        console.log(`${(payload as any).user} has been logged out`);
        
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

export { route as signoutRoute };