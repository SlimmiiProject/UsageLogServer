import { RegExpVal } from '../utils/RegexValidator';
import express, { Request, Response } from "express";
import { SessionManager } from '../accounts/SessionManager';
import { DataProcessor } from '../data/DataProcessing';
import { Device } from '../data/entities/Device';
import { User } from '../types/express-session';
const router = express.Router();

router.post("raw-meter-entry", (req: Request, res: Response) => {
    // TODO Redirect Raw Base64 image to local Python OCR Program
    const imageBase64 = req.body.image;
    if (imageBase64 && RegExpVal.validate(imageBase64, RegExpVal.base64Encoded)) {

    }
});

router.post("/meter-entry", (req: Request, res: Response) => {
    // TODO Receives data from local python program with JSON data about the meter entry
});


router.get("/week-data", /*onlyAcceptJSON,*/ async (req: Request, res: Response) => {
    const userData: User = SessionManager.getSessionData(req).user;

    const devices: Device[] = await DataProcessor.GetDevices(userData.id);

    console.log(await DataProcessor.GetData(userData.id));
});


module.exports = router;