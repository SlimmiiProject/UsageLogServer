import { onlyAcceptJSON } from './../utils/Middleware';
import { DeviceSpecificData } from './../data/DataProcessing';
import { RegExpVal } from '../utils/RegexValidator';
import express, { Request, Response } from "express";
import { SessionManager } from '../accounts/SessionManager';
import { DataProcessor } from '../data/DataProcessing';
import { User } from '../types/express-session';
import { DateUtil, Period } from '../utils/DateUtil';
const router = express.Router();

router.use(SessionManager.loginRequired);

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

type DataOutput = {
    devices: DeviceData[];
}

type DeviceData = {
    nameDevice: string;
    data: DeviceValues[];
}

type DeviceValues = {
    name: string;
    day: number;
    night: number;
}

router.get("/data", /*onlyAcceptJSON, */ async (req: Request, res: Response) => {
    const userData: User = SessionManager.getSessionData(req).user;
    const params: DataParams = req.params as DataParams;

    let begin: Date = new Date(params.beginDate);
    let endDate: Date = DateUtil.getDateOverPeriod(begin, params.period);

    const data: DeviceSpecificData[] = await DataProcessor.GetData(userData.id, begin, endDate);
    let output: DataOutput = { devices: [] };

    data.forEach((v) => {
        const deviceData: DeviceValues[] = v.data.map((d) => {
            return {
                name: DateUtil.getDisplayForPeriod(d.created_at, params.period || "Week"),
                day: d.Day,
                night: d.Night
            }
        });

        output.devices.push({
            nameDevice: v.device_alias,
            data: deviceData
        });
    });

    res.json(output);
});


module.exports = router;
