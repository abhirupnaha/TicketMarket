import { Request, Response, NextFunction } from "express";

import { customError } from "../errors/custom-error";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof customError) {
        console.log(err.name, 'error occured');
        return res.status(err.statusCode).json({ errors: err.serializeErrors() });
    } else {
        console.log('unknown error occured');
        return res.status(500).json({ errors: [
            { message: 'unknown error occured' }
        ]});
    }
};