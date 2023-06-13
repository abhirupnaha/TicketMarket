import { customError } from "./custom-error";

export class NotAuthorizedError extends customError {
    public statusCode = 401;
    public name = 'NotAuthroizedError';

    constructor() {
        super('Authroization error');
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: 'Not Authorized' }];
    }
}