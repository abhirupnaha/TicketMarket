import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface userPayload {
    email: string;
    user: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: userPayload
        }
    }
}

export function currentUser(
    req: Request,
    res: Response, 
    next: NextFunction
) {
    if (!req.session?.jwt)
        return next();
    
    try {
        const payload = verify(
            req.session.jwt, 
            process.env.JWT_SECRET!
        ) as userPayload;
        req.currentUser = payload;
    } catch (err) {
        console.log('jwt in invalid');
    }

    next();
}