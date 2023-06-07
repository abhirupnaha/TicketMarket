import { customError } from "./custom-error";

export class NotFound extends customError {
    public statusCode = 404;

    constructor() {
        super('Route not found');
    }

    serializeErrors() {
        return [{ message: 'route not found' }]
    }
}