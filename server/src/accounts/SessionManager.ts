import { Request, Response } from "express";

export class SessionManager {

    public static getSession(request: Request) {
        return request.session;
    }

    public static hasSession(request:Request) {
        return request.session !== undefined;
    }

    public static getData(request: Request) {
        return request.session;
    }

    public static save(request: Request) {
        request.session && request.session.save();
    }

    public static destroy(request: Request, response: Response) {
        request.session && request.session.destroy((e) => {
            response.redirect("/");
        });
    }
}