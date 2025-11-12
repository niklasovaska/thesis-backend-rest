// Wrapping async controllers to catch async/await errors

import { RequestHandler } from "express";

export const globalCatchAsync = (fn: RequestHandler): RequestHandler => {
    return(req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}