import { NextFunction, Request, Response } from "express";
import { UserAccount } from "../data/entities/UserAccount";
import { UserSession } from "../types/express-session";

export class SessionManager {

    /**
     * If the request has a session, update the session data
     * @param {Request} request - The request object
     * @param {Response} response - The response object that will be sent back to the client.
     * @param {NextFunction} next - This is a function that you call when you're done with your
     * middleware.
     */
    public static setup(request: Request, response: Response, next: NextFunction) {
        if (this.hasSession(request)) this.updateSessionData(request);
        next();
    }

    /**
     * It takes a request object and a user account object, and if the user account object is not
     * undefined, it updates the session data to say that the user is logged in, and it sets the user data
     * to the user account object
     * @param {Request} request - The request object from the express request handler
     * @param {UserAccount} account - UserAccount - The account that is logged in
     * @returns a promise.
     */
    public static async createLoggedInSession(request: Request, account: UserAccount) {
        if (account == undefined) return;

        this.updateSessionData(request, async (data) => {
            data.isLoggedIn = true
            data.user = {
                firstName: account.firstname,
                lastName: account.lastname,
                email: account.email,
                phoneNumber: account.phone,
                isAdmin: await account.isAdmin()
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

    /**
     * It destroys the session and redirects the user to the home page.
     * @param {Request} request - This is the request object that contains the session.
     * @param {Response} response - The response object that will be sent back to the client.
     */
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

    /**
     * "If the request has a session, get the session data, call the callback function with the session
     * data, and save the session."
     * 
     * The callback function is a function that takes a UserSession object and returns a promise
     * @param {Request} request - The request object from the express request handler.
     * @param [callback] - A function that takes in the session data and returns a promise.
     */
    public static async updateSessionData(request: Request, callback?: { (data: UserSession): Promise<void> }) {
        if (this.hasSession(request)) {
            const data = this.getSessionData(request);
            await callback(data);
            this.save(request);
        }
    }
}