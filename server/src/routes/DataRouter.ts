import { onlyAcceptJSON } from './../utils/Middleware';
import { DeviceSpecificData } from './../data/DataProcessing';
import { RegExpVal } from '../utils/RegexValidator';
import express, { Request, Response } from "express";
import { SessionManager } from '../accounts/SessionManager';
import { DataProcessor } from '../data/DataProcessing';
import { User } from '../types/express-session';
import { DateUtil, Period } from '../utils/DateUtil';
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




type DataParams = { [key: string]: string } & {
    period: Period,
    beginDate: number;
};

const dayInMS = 86_400_000;

router.get("/data", onlyAcceptJSON, async (req: Request, res: Response) => {
    const userData: User = SessionManager.getSessionData(req).user;
    const data: DeviceSpecificData[] = await DataProcessor.GetData(userData.id);
    const params: DataParams = req.params as DataParams;

    let begin: Date = new Date(params.beginDate);
    let endDate: Date = DateUtil.getDateOverPeriod(begin, params.period);

    // TODO Wait for TypeORM changes to get data between begin and end
});


module.exports = router;