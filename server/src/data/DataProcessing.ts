import { Administrator } from "./entities/Administrator";
import { Data } from "./entities/Data";
import { DatabaseConnector } from "./DatabaseConnector";
import { UserAcount } from "./entities/User";
import { Device } from "./entities/Device";
export class DataProcessor {
  //#region Create Data
  public async CreateDevice(DeviceId: string, alias?: string) {
    const newDevice = new Device();
    newDevice.deviceId = DeviceId;
    if (alias) newDevice.friendlyName = alias;
    await newDevice.save();
  }
  public async CreateUser(
    userId: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phonenumber: string
  ): Promise<void> {
    await UserAcount.insert({
      userId: userId,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      phone: phonenumber,
      device: undefined,
    });
  }
  public async CreateData(
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

  public async CreateAdministrator(userid: string): Promise<void> {
    let user = await UserAcount.findOneBy({ userId: userid });
    Administrator.insert({ user });
  }
  //#endregion

  //#region get Data
  public async GetAdministrator(userId: string): Promise<Administrator> {
    let AdminQuery = DatabaseConnector.INSTANCE._dataSource
      .getRepository(Administrator)
      .createQueryBuilder("administrator")
      .innerJoinAndSelect("administrator.user", "user")
      .where("user.userid = :adminid", { adminid: userId })
      .getOne();
    return await AdminQuery;
  }

  //#endregion

  //#region Alter Data
  public async ChangePassword(userId: string, password: string): Promise<void> {
    await UserAcount.update(userId, { password: password });
  }

  //does not work yet!!
  public async AddDevicetoUser(
    userId: string,
    deviceid: string
  ): Promise<void> {
    await DatabaseConnector.INSTANCE._dataSource
      .createQueryBuilder()
      .update(UserAcount)
      .set({ device: [...deviceid] })
      .where("userid = :id", { id: userId })
      .execute();
  }

  //#endregion

  //#region  Delete Data
  public async DeleteAdministrator(adminId: number): Promise<void> {
    Administrator.delete({ adminId: adminId });
  }
  //#endregion
}
