import express, { Request, Response } from "express";
import { DataController } from "../data/DataController";
const router = express.Router();

router.get("/",  (req: Request, res: Response) => {
    const translationObject = DataController.getTranslationJson();
    res.json(translationObject);
});

module.exports = router;