import { NextFunction, Request, Response } from "express";
import { AccountManager } from "../accounts/AccountManager";
import { SessionManager } from "../accounts/SessionManager";

export class Middleware {

  /**
    * If the request header does not include the string 'application/json', then send a 500 status code.
    * @param {Request} req - The request object
    * @param {Response} res - The response object
    * @param {NextFunction} next - This is a function that you call when you want to move on to the next
    * middleware.
    * @returns the result of the sendStatus function.
    */
  public static onlyAcceptJSON = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers["accept"].includes("application/json")) return res.sendStatus(500);
    next();
  }

  public static requireAdminpermission = async (req: Request, res: Response, next: NextFunction) => {
    if (!await AccountManager.isAdministrator(SessionManager.getSessionData(req).user.id)) {
      return res.sendStatus(500);
    }

    next();
  }
}