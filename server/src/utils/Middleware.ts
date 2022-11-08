import { NextFunction, Request, Response } from "express";

export const onlyAcceptJSON = (req:Request, res:Response, next:NextFunction) => {
    if(!req.headers["accept"].includes("application/json")) {
        res.sendStatus(500);
        return;
    }

    next();
}