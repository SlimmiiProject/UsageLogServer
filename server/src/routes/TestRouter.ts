import express, { Request, Response } from "express";
import { SessionManager } from "../accounts/SessionManager";
import { DataProcessor } from "../data/DataProcessing";
import { Middleware } from "../utils/Middleware";
const router = express.Router();

/** A post request to the server. */
router.post("/addData", async (req: Request, res: Response)=> {
    const { day, night, deviceIndex } = req.body;
  res.json(await DataProcessor.AddTestData(deviceIndex, day, night))
})

module.exports = router;