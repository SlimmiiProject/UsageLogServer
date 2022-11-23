import { DateUtil } from "../utils/DateUtil";
import { ObjectUtil } from "../utils/ObjectUtil";
import { DataProcessor } from "./DataProcessing";
import { TemporaryData } from "./entities/TemporaryData";

export class MeterEntryProcessor {

    private readonly deviceId: string;
    private tempEntry: TemporaryData;
    private readonly day: number;
    private readonly night: number;

    constructor(deviceId: string, day: number, night: number) {
        this.deviceId = deviceId;
        this.day = day;
        this.night = night;
    }

    private setup = async () => this.tempEntry = await DataProcessor.getTempEntry(this.deviceId);

    private hasPassedHour = () => this.tempEntry.created_at.getHours() != DateUtil.getCurrentDate().getHours();

    private hasEntry = () => ObjectUtil.isSet(this.tempEntry);

    private migrateToHourlyData = async () => {
        await DataProcessor.createHourlyData(this.deviceId, this.tempEntry.Day, this.tempEntry.Night);
        await this.tempEntry.remove();
    };

    private getDevice = async () => await DataProcessor.getDevice(this.deviceId);

    public process = async () => {
        await this.setup();

        // Does it have an entry, and did it pass the previous hour
        if (this.hasEntry() && this.hasPassedHour()) await this.migrateToHourlyData();

        // Does any temporary data entry already exist for this hour and device
        if (!this.hasEntry()) {
            // Create new temp data for this hour
            this.tempEntry = TemporaryData.createTempData(await this.getDevice(), this.day, this.night);
        } else {
            // Add values to existing temp data
            this.tempEntry.add(this.day, this.night);
        }

        // Save temporary data
        await this.tempEntry.save();
    }
}