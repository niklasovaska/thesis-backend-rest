export class NotFoundError extends Error {
    status: number;
    constructor(resource: string) {
        super(`${resource} not found`);
        this.name = "NotFoundError";
        this.status = 404;
    }
}