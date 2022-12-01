import { off } from "process";
import { DataProcessor, DeviceSpecificData } from "./DataProcessing"
import { Data } from "./entities/Data";
import { Device } from "./entities/Device";
import { DateUtil, Period } from "../utils/DateUtil";
import { DeviceValues } from "../routes/DataRouter";

export class DisplayDataManager {

    private allData: DeviceSpecificData;
    private device: Device;

    constructor(device: Device, data: DeviceSpecificData) {
        this.allData = data;
        this.device = device;
    }

    public static create = async (deviceId: string, data: DeviceSpecificData) => new DisplayDataManager(await DataProcessor.getDevice(deviceId), data);

    public getByPeriod = (period: Period, beginDate: Date, endDate: Date): DeviceValues[] => {
        switch (period) {
            case "Day": return this.compileBase(beginDate, endDate, period, (data, index) => data.created_at.getHours() == index);
            case "Week": return this.compileBase(beginDate, endDate, period, (data, index) => data.created_at.getDate() == (beginDate.getDate() + index));
            case "Month": return this.compileBase(beginDate, endDate, period, (data, index) => data.created_at.getDate() == (beginDate.getDate() + index));
        }
    }

    private compileBase = (beginDate: Date, endDate: Date, period: Period, dataFilter: { (data: Data, index: number): boolean }) => {
        const data: DeviceValues[] = [];
        const tempDate: Date = period != "Day" ? beginDate : new Date(beginDate.getFullYear(), beginDate.getMonth(), beginDate.getDate(), beginDate.getHours());
        const max = period == "Day" ? 23 : period == "Week" ? 6 : endDate.getDate() - 1;

        for (let x = 0; x <= max; x++) {
            const dataEntry = Data.createData(this.device, 0, 0);
            if (period == "Day") tempDate.setHours(x);

            this.allData.data.filter((data) => dataFilter(data, x)).forEach((v) => dataEntry.add(Number(v.Day), Number(v.Night)));
            data.push(this.createDeviceValue(tempDate, x, period, dataEntry));
        }

        return data;
    }

    private createDeviceValue = (beginDate: Date, offset: number, period: Period, data: Data): DeviceValues => {
        const date = new Date(beginDate.getFullYear(), beginDate.getMonth(), beginDate.getDate() + offset, beginDate.getHours());
        const nameToDisplay = DateUtil.getDisplayForPeriod(date, period);

        return {
            name: nameToDisplay,
            day: data.Day,
            night: data.Night
        }
    }
}