import { ValidationError } from "express-validator";

import { customError } from "./custom-error";

export class DatabaseConnectionError extends customError {
    public statusCode = 500;
    public reason = 'error connecting to database';
    
    constructor(public errors: ValidationError[]) {
        super('error connecting to database');
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ]
    }
}