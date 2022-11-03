import { NextFunction, Request, Response } from "express";

export const onlyAcceptJSON = (req:Request, res:Response, next:NextFunction) => {
    if(req.headers["content-type"] !== "application/json") {
        res.status(500);
        return;
    }

    next();
}