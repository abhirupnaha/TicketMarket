import { customError } from "./custom-error";

export class NotFound extends customError {
    public statusCode = 404;
    public name = 'NotFoundError';

    constructor() {
        super('Route not found');
    }

    serializeErrors() {
        return [{ message: 'route not found' }]
    }
}