import { Administrator } from "./entities/Administrator";
import { Data } from "./entities/Data";
import { DatabaseConnector } from "./DatabaseConnector";
import { UserAcount } from "./entities/User";
import { Device } from "./entities/Device";
import { TemporaryData } from "./entities/TemporaryData";
export class DataProcessor {
  //#region Create Data
  public async CreateDevice(DeviceId: string, alias?: string) {
    const newDevice = new Device();
    newDevice.deviceId = DeviceId;
    if (alias) newDevice.friendlyName = alias;
    await newDevice.save();
  }

  public async CreateUser(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phonenumber: number,
    devices: Device[] = []
  ): Promise<void> {
    await UserAcount.insert({
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      phone: phonenumber,
      device: devices,
    });
  }

  private async CreateData(
    deviceId: string,
    date: Date,
    dataDay?: number,
    DataNight?: number
  ): Promise<void> {
    let dataDevice = await Device.findOneBy({ deviceId: deviceId });
    const newData = new Data();
    newData.device = dataDevice;
    newData.created_at = date;
    if (dataDay) newData.Day = dataDay;
    if (DataNight) newData.Night = DataNight;
    newData.save();
  }

  public async CreatetempData(
    deviceId: string,
    dataDay?: number,
    DataNight?: number
  ): Promise<void> {
    const newData = new TemporaryData();
    newData.deviceId = deviceId;
    if (dataDay) newData.Day = dataDay;
    if (DataNight) newData.Night = DataNight;
    newData.save();
  }

  public async CreateAdministrator(userid: number): Promise<void> {
    let user = await UserAcount.findOneBy({ userId: userid });
    Administrator.insert({ user });
  }
  //#endregion

  //#region get Data
  public async GetAdministrator(userId: number): Promise<Administrator> {
    let AdminQuery = DatabaseConnector.INSTANCE.dataSource
      .getRepository(Administrator)
      .createQueryBuilder("administrator")
      .innerJoinAndSelect("administrator.user", "user")
      .where("user.userid = :adminid", { adminid: userId })
      .getOne();
    return await AdminQuery;
  }
  public async GetDevices(userid: number): Promise<Device[]> {
    const devices = await DatabaseConnector.INSTANCE.dataSource
      .getRepository(Device)
      .createQueryBuilder("device")
      .leftJoinAndSelect("device.user", "user")
      .where("user.userid = :id", { id: userid })
      .getMany();
    return devices;
  }
  public async GetData(userid: number): Promise<Data[]> {
    let allData = await DatabaseConnector.INSTANCE.dataSource
      .getRepository(Data)
      .createQueryBuilder("data")
      .leftJoinAndSelect("data.device", "dev")
      .where("dev.user = :id", { id: userid })
      .getMany();
    return allData;
  }

  public async GetUser(
    userid?: number,
    email?: string,
    number?: number
  ): Promise<UserAcount> {
    if (userid) {
      return await UserAcount.findOneBy({ userId: userid });
    } else if (email) {
      return await UserAcount.findOneBy({ email: email });
    } else if (number) {
      return await UserAcount.findOneBy({ phone: number });
    }
  }
  //#endregion

  //#region Alter Data
  //probably redundant.
  public async ChangePassword(userId: number, password: string): Promise<void> {
    await UserAcount.update(userId, { password: password });
  }

  public async EditAcount(
    userid: number,
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    phone: number
  ) {
    await UserAcount.update(userid, {
      firstname: firstname,
      lastname: lastname,
      password: password,
      email: email,
      phone: phone,
    });
  }

  public async AddDevicetoUser(
    userId: number,
    deviceid: string
  ): Promise<void> {
    let user = await UserAcount.findOneBy({ userId: userId });
    await Device.update({ deviceId: deviceid }, { user: user });
  }

  public async ChangeDeviceAlias(device_index: number, alias: string) {
    Device.update({ device_index: device_index }, { friendlyName: alias });
  }
  //#endregion

  //#region  Delete Data
  public async DeleteAdministrator(adminId: number): Promise<void> {
    Administrator.delete({ adminId: adminId });
  }

  //fails if administrator is not removed first
  public async DeleteUser(userId: number): Promise<void> {
    UserAcount.delete({ userId: userId });
  }
  //fails if data is not removed first
  public async DeleteDevice(deviceid: string): Promise<void> {
    Device.delete({ deviceId: deviceid });
  }

  public async DeleteData(dataid: number): Promise<void> {
    Data.delete({ dataId: dataid });
  }
  private async BulkDeleteTempData(deviceId: string) {
    DatabaseConnector.INSTANCE.dataSource
      .createQueryBuilder()
      .delete()
      .from(TemporaryData)
      .where("deviceId: = :id", { id: deviceId })
      .execute();
  }
  //#endregion

  //CREATE DATE FROM TEMP DATA
  public async CleanTemproraryData() {
    let allDevices: Device[] = await Device.find();
    let allTempData: TemporaryData[] = await TemporaryData.find();
    let totalDay: number, totalNight: number;
    allDevices.map(async (device) => {
      totalDay = 0;
      totalNight = 0;
      let filteredData: TemporaryData[] = allTempData.filter(
        (data) => data.deviceId == device.deviceId
      );
      filteredData.map((data) => {
        totalDay += data.Day;
        totalNight += data.Night;
      });
      await this.CreateData(
        device.deviceId,
        new Date(Date.now()),
        totalDay,
        totalNight
      );
      await this.BulkDeleteTempData(device.deviceId);
    });
  }
}
