import express, { Request, Response } from "express";
import { SessionManager } from "../accounts/SessionManager";
import { DataProcessor } from "../data/DataProcessing";
import { Middleware } from "../utils/Middleware";
const router = express.Router();

router.use(SessionManager.loginRequired);
router.use(Middleware.requireAdminpermission);

/* A route that is used to get the logfile data. */
router.get("/logfile", async (req: Request, res: Response) => 
  res.json(await DataProcessor.GetLogfileData()));

/* A route that is used to get all the users. */
router.get("/allusers", async (req: Request, res: Response) => {
  res.json(await DataProcessor.getAllUsers());
})

/* A route that is used to get all the devices. */
router.get("/allDevices", async (req: Request, res: Response) => {
  res.json(await DataProcessor.getAllDevices());
})

/* A route that is used to create an administrator. */
router.post("/create-admin", async (req: Request, res: Response) => {
  const {userId}:{userId:number} = req.body;
  res.json(await DataProcessor.createAdministrator(userId))
})

module.exports = router;