import express, { Request, Response } from "express";
import { AccountManager } from "../accounts/AccountManager";
import { DataProcessor } from "../data/DataProcessing";
const router = express.Router();

router.get("/logfile", async (req: Request, res: Response) => {
  return await DataProcessor.GetLogfileData()
});

module.exports = router;