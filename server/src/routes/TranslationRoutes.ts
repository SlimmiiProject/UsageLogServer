import express, { Request, Response } from "express";
import { DataController } from "../data/DataController";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const translationObject = await DataController.getTranslationJson();
    res.status(200).json(translationObject);
});

module.exports = router;