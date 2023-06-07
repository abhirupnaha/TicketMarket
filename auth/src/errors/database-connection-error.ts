import { ValidationError } from "express-validator";

export class DatabaseConnectionError extends Error {
    public statusCode = 500;
    public reason = 'error connecting to database';
    
    constructor(public errors: ValidationError[]) {
        super();
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ]
    }
}