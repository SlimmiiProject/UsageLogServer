import { SessionManager } from './../accounts/SessionManager';
import express, { Request, Response } from "express";
import { AccountManager } from '../accounts/AccountManager';
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const sessionData = SessionManager.getSessionData(req);

    if (!sessionData.isLoggedIn) return res.json({
        error: "Not Logged In"
    });

    res.json(sessionData);
});

router.get("/admin-check", async (req: Request, res: Response) => {
    const sessionData = SessionManager.getSessionData(req);
   
    if (!sessionData.isLoggedIn) return res.json({
        error: "Not Logged In"
    });

    res.json({isAdmin: await AccountManager.isAdministrator(sessionData.user.id)});
});

module.exports = router;