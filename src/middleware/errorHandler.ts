import { Request, Response, NextFunction } from "express";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(`${err.name}: ${err.message}`);

    const status = err.status || 500;

    res.status(status).json({
        error: {
            type: err.name,
            message: err.message,
        },
        _links: {
            self: { href: req.originalUrl }
        },
    });
}