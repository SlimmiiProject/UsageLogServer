import { NextFunction, Request, Response } from "express";
import { UserAccount } from "../data/entities/UserAccount";
import { UserSession } from "../types/express-session";

export class SessionManager {

    public static setup(request: Request, response: Response, next: NextFunction) {
        if (this.hasSession(request)) this.updateSessionData(request);
        next();
    }

    public static createLoggedInSession(request: Request, account: UserAccount) {
        if (account == undefined) return;

        this.updateSessionData(request, async (data) => {
            data.isLoggedIn = true
            data.user = {
                first_name: account.firstname,
                last_name: account.lastname,
                email: account.email,
                phonenumber: account.phone
            };
        });
    }

    public static getSession(request: Request) {
        return request.session;
    }

    public static getSessionData(request: Request) {
        const data = request.session.data;

        if (!data) request.session.data = {
            isLoggedIn: false
        }

        return request.session.data;
    }

    public static hasSession(request: Request) {
        return request.session !== undefined;
    }

    public static save(request: Request) {
        request.session && request.session.save();
    }

    public static destroy(request: Request, response: Response) {
        request.session && request.session.destroy((e) => {
            response.redirect("/");
        });
    }

    public static logout(request: Request) {
        this.updateSessionData(request, async (data) => {
            data.isLoggedIn = true;
            data.user = undefined;
        });
    }

    public static async updateSessionData(request: Request, callback?: { (data: UserSession): Promise<void> }) {
        if (this.hasSession(request)) {
            const data = this.getSessionData(request);
            await callback(data);
            this.save(request);
        }
    }
}