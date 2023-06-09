import { ValidationError } from "express-validator";

import { customError } from "./custom-error";

export class RequestValidationError extends customError {
    public statusCode = 400;
    public name = 'RequestValidationError'

    constructor(public errors: ValidationError[]) {
        super('invalid request parameters');
        // Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map((error) => {
            if (error.type === 'field') {
                return { message: error.msg, field: error.path};
            }
            return { message: error.msg }
        });
    }
}