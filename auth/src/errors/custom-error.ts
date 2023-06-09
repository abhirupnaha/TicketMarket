export abstract class customError extends Error {
    abstract statusCode: number;
    abstract name: string;

    constructor(message: string) {
        super(message);
    }

    abstract serializeErrors(): {
        message: string
        field?: string
    }[];
}