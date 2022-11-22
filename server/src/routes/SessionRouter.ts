import { SessionManager } from './../accounts/SessionManager';
import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    const sessionData = SessionManager.getSessionData(req);

    if (!sessionData.isLoggedIn) return res.json({
        error: "Not Logged In"
    });

    res.json(sessionData);
});

module.exports = router;