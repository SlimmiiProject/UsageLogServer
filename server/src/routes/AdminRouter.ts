import express, { Request, Response } from "express";
import { SessionManager } from "../accounts/SessionManager";
import { DataProcessor } from "../data/DataProcessing";
import { Middleware } from "../utils/Middleware";
const router = express.Router();

router.use(SessionManager.loginRequired);
router.use(Middleware.requireAdminpermission);

router.get("/logfile", async (req: Request, res: Response) => {
  res.json(await DataProcessor.GetLogfileData());
});

router.get("/allusers", async (req: Request, res: Response) => {
  //res.json(await DataProcessor.GetAllusers());
})

module.exports = router;