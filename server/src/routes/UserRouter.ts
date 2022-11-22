import express, { Request, Response } from "express";
import { SessionManager } from "../accounts/SessionManager";
const router = express.Router({ mergeParams: true });

router.use(SessionManager.loginRequired);

router.route("/user-data")
    .post((req: Request, res: Response) => {
        //TODO Update data
    })
    .get((req: Request, res: Response) => {
        //TODO Get user data
    });

router.route("/meters")
    .post((req: Request, res: Response) => {
        //TODO Add meter
    })
    .get((req: Request, res: Response) => {
        //TODO Get meters
    })
    .delete((req: Request, res: Response) => {
        // Delete meter
    });

module.exports = router;