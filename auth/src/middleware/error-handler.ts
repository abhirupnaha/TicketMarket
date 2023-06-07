import { Request, Response, NextFunction } from "express";

import { RequestValidationError } from "../errors/request-validation-errors";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof RequestValidationError) {
        console.log('RequestValidationError error occured');
        return res.status(err.statusCode).json({ errors: err.serializeErrors() });
    } else if (err instanceof DatabaseConnectionError) {
        console.log('DatabaseconnectionError error occured');
        return res.status(err.statusCode).json({ errors: err.serializeErrors() });
    } else {
        console.log('unknown error occured');
        return res.status(500).json({ errors: [
            { message: 'unknown error occured' }
        ]});
    }

    res.status(400).json({
        message: err.message
    });
};