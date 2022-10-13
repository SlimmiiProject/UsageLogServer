import { Administrator } from "./entities/Administrator";
import { Data } from "./entities/Data";
import { DatabaseConnector } from "./DatabaseConnector";
import { UserAccount } from "./entities/UserAccount";
import { Device } from "./entities/Device";
export class DataProcessor {
  //#region Create Data
  public static async CreateDevice(DeviceId: string, alias?: string) {
    const newDevice = new Device();
    newDevice.deviceId = DeviceId;
    if (alias) newDevice.friendlyName = alias;
    await newDevice.save();
  }

  public static async CreateUser(
    firstname: string,
    lastname: string,
    email: string,
    password: string | undefined,
    phonenumber: string,
  ): Promise<void> {
    await UserAccount.insert({
      email: email,
      hashed_password: password,
      firstname: firstname,
      lastname: lastname,
      phone: phonenumber,
      device: [],
    });
  }

  public static async CreateData(
    deviceId: string,
    dataDay?: number,
    DataNight?: number
  ): Promise<void> {
    let dataDevice = await Device.findOneBy({ deviceId: deviceId });
    const newData = new Data();
    newData.device = dataDevice;
    if (dataDay) newData.Day = dataDay;
    if (DataNight) newData.Night = DataNight;
    newData.save();
  }

  public static async CreateAdministrator(userid: number): Promise<void> {
    let user = await UserAccount.findOneBy({ userId: userid });
    Administrator.insert({ user });
  }
  //#endregion

  //#region get Data
  public static async GetAdministrator(userId: number): Promise<Administrator> {
    let AdminQuery = DatabaseConnector.INSTANCE.dataSource
      .getRepository(Administrator)
      .createQueryBuilder("administrator")
      .innerJoinAndSelect("administrator.user", "user")
      .where("user.userid = :adminid", { adminid: userId })
      .getOne();
    return await AdminQuery;
  }
  public static async GetDevices(userid: number): Promise<Device[]> {
    const devices = await DatabaseConnector.INSTANCE.dataSource
      .getRepository(Device)
      .createQueryBuilder("device")
      .leftJoinAndSelect("device.user", "user")
      .where("user.userid = :id", { id: userid })
      .getMany();
    return devices;
  }
  public static async GetData(userid: number): Promise<Data[]> {
    let allData = await DatabaseConnector.INSTANCE.dataSource
      .getRepository(Data)
      .createQueryBuilder("data")
      .leftJoinAndSelect("data.device", "dev")
      .where("dev.user = :id", { id: userid })
      .getMany();
    return allData;
  }

  public static async GetUser(
    userid?: number,
    email?: string,
    number?: string
  ): Promise<UserAccount> {
    if (userid) {
      return await UserAccount.findOneBy({ userId: userid });
    } else if (email) {
      return await UserAccount.findOneBy({ email: email });
    } else if (number) {
      return await UserAccount.findOneBy({ phone: number });
    }
  }
  //#endregion

  //#region Alter Data
  public static async ChangePassword(userId: number, hashedPassword: string): Promise<void> {
    await UserAccount.update(userId, { hashed_password: hashedPassword });
  }

  public static async AddDevicetoUser(
    userId: number,
    deviceid: string
  ): Promise<void> {
    let user = await UserAccount.findOneBy({ userId: userId });
    await Device.update({ deviceId: deviceid }, { user: user });
  }

  public static async ChangeDeviceAlias(device_index: number, alias: string) {
    Device.update({ device_index: device_index }, { friendlyName: alias });
  }
  //#endregion

  //#region  Delete Data
  public static async DeleteAdministrator(adminId: number): Promise<void> {
    Administrator.delete({ adminId: adminId });
  }

  //fails if administrator is not removed first
  public static async DeleteUser(userId: number): Promise<void> {
    UserAccount.delete({ userId: userId });
  }
  //fails if data is not removed first
  public static async DeleteDevice(deviceid: string): Promise<void> {
    Device.delete({ deviceId: deviceid });
  }

  public static async DeleteData(dataid: number): Promise<void> {
    Data.delete({ dataId: dataid });
  }
  //#endregion
}
