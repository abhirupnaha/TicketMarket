import { customError } from "./custom-error";

export class BadRequestError extends customError {
    public statusCode = 400;
    public name = 'BadRequestError';

    constructor(message: string) {
        super(message);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}