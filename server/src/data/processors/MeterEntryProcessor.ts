import { DateUtil } from "../../utils/DateUtil";
import { ObjectUtil } from "../../utils/ObjectUtil";
import { DataProcessor } from "../DataProcessing";
import { Device } from "../entities/Device";
import { TemporaryData } from "../entities/TemporaryData";

export class MeterEntryProcessor {

    private readonly deviceId: string;
    private tempEntry: TemporaryData;
    private readonly day: number;
    private readonly night: number;

    private device: Device;

    constructor(deviceId: string, day: number, night: number) {
        this.deviceId = deviceId;
        this.day = day;
        this.night = night;
    }

    private setup = async () => {
        this.tempEntry = await DataProcessor.getTempEntry(this.deviceId);
        this.device = await DataProcessor.getDevice(this.deviceId);
    }

    private hasPassedHour = () => this.tempEntry.created_at.getHours() != DateUtil.getCurrentDate().getHours();

    private hasEntry = () => ObjectUtil.isSet(this.tempEntry);

    private migrateToHourlyData = async () => {
        await DataProcessor.createHourlyData(this.deviceId, this.tempEntry.Day, this.tempEntry.Night);
        await this.tempEntry.remove();
    };

    private getDevice = async () => await DataProcessor.getDevice(this.deviceId);

    public process = async () => {
        await this.setup();

        if (!this.device) return;

        if (this.hasEntry() && this.hasPassedHour()) await this.migrateToHourlyData(); // Does it have an entry, and did it pass the previous hour

        const dayDiff = this.day - this.device.OldDay, nightDiff = this.night - this.device.OldNight;

        if (!this.hasEntry()) { // Does any temporary data entry already exist for this hour and device
            this.tempEntry = TemporaryData.createTempData(await this.getDevice(), dayDiff, nightDiff);  // Create new temp data for this hour
        } else {
            this.tempEntry.add(dayDiff, nightDiff);   // Add values to existing temp data
        }

        this.device.OldDay = this.day;
        this.device.OldNight = this.night;
        await this.device.save();

        // Save temporary data
        await this.tempEntry.save();
    }
}