import { DisplayDataManager } from './../data/DisplayDataManager';
import { DeviceSpecificData } from './../data/DataProcessing';
import express, { Request, Response } from "express";
import { SessionManager } from '../accounts/SessionManager';
import { DataProcessor } from '../data/DataProcessing';
import { User } from '../types/express-session';
import { DateUtil, Period } from '../utils/DateUtil';
import {PythonShell} from 'python-shell';
import { ObjectUtil } from '../utils/ObjectUtil';

const router = express.Router();
router.use(SessionManager.loginRequired);

router.post("/raw-meter-entry", (req: Request, res: Response) => {
    // TODO Redirect Raw Base64 image to local Python OCR Program
    /*const imageBase64 = req.body.image;
    if (imageBase64 && RegExpVal.validate(imageBase64, RegExpVal.base64Encoded)) {
        PythonShell.run(__dirname+'/test.py', null, function (err: any) {
            if (err) throw err;
            console.log('finished');
          });
    }*/
    PythonShell.run(__dirname+'/test.py', null, function (err: any) {
        if (err) throw err;
        console.log('finished');
      });
});

interface MeterEntryData {
    device_id: string;
}

router.post("/meter-entry", async (req: Request, res: Response) => {
    const data: MeterEntryData = req.body;

    if (!Object.values(data).every(ObjectUtil.isSet))
        return res.json({ error: true });
});


type DataParams = { [key: string]: string } & {
    period: Period,
    beginDate: number;
};

export type DeviceData = {
    nameDevice: string;
    data: DeviceValues[];
}

export type DeviceValues = {
    name: string;
    day: number;
    night: number;
}

router.get("/data", /*Middleware.onlyAcceptJSON,*/ async (req: Request, res: Response) => {
    const userData: User = SessionManager.getSessionData(req).user;
    const params: DataParams = req.query as DataParams;
    const period = params.period || "Week";

    const begin: Date = params.beginDate ? new Date(params.beginDate) : DateUtil.getStartOfPeriod(DateUtil.getCurrentDate(), period);
    const endDate: Date = DateUtil.getDateOverPeriod(begin, period);

    const data: DeviceSpecificData[] = await DataProcessor.getData(userData.id, begin, endDate);
    const output: DeviceData[] = [];

    for await (const v of data) {
        const manager = await DisplayDataManager.create(v.deviceId, v);
        const deviceData = manager.getByPeriod(period, begin, endDate)
        output.push({ nameDevice: v.device_alias, data: deviceData });
    }

    res.json(output);
});

router.post("create-device", async (req: Request, res: Response) => {
    const { dev_id, user_id } = req.body;
    res.json(await DataProcessor.RegisterAccountWithUser(dev_id, user_id))
});

router.post("send-data", async  (req: Request, res: Response) => {
    const { image, battery, dev_id } = req.body;
    res.json(await DataProcessor.SendDataFromDevice(dev_id, battery, image))
});


module.exports = router;