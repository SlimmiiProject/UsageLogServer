import express, { Request, Response } from "express";
import { DataProcessor } from "../data/DataProcessing";
const router = express.Router();

router.get("/logfile", async (req: Request, res: Response) => await DataProcessor.GetLogfileData());

module.exports = router;