import { Administrator } from "./entities/Administrator";
import { Data } from "./entities/Data";
import { DatabaseConnector } from "./DatabaseConnector";
import { UserAcount } from "./entities/User";
import { Device } from "./entities/Device";
export class DataProcessor {
  //#region Create Data
  /*
whats needed?:

create device: X
create user : X
create data: X
create administrator: X
*/

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
    phonenumber: string,
    device?: Device
  ): Promise<void> {
    if (device) {
      await UserAcount.insert({
        userId: userId,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        phone: phonenumber,
        device: device,
      });
    } else {
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
  /*
whats needed?:

get admin: X
get device: X
get user: X
get data: X


*/

  public async GetAdministrator(userId: string): Promise<Administrator> {
    let AdminQuery = DatabaseConnector.INSTANCE.dataSource
      .getRepository(Administrator)
      .createQueryBuilder("administrator")
      .innerJoinAndSelect("administrator.user", "user")
      .where("user.userid = :adminid", { adminid: userId })
      .getOne();
    return await AdminQuery;
  }

  //NEEDS TESTING
  public async GetDevices(userid: string): Promise<Device[]> {
    const devices = await DatabaseConnector.INSTANCE.dataSource
      .getRepository(Device)
      .createQueryBuilder("device")
      .leftJoinAndSelect("device.user", "user")
      .where("user.userid = :id", { id: userid })
      .getMany();
    return devices;
  }
  public async GetData(userid: string): Promise<Data[]> {
    let allData = await DatabaseConnector.INSTANCE.dataSource
      .getRepository(Data)
      .createQueryBuilder("data")
      .leftJoinAndSelect("data.deviceDeviceId", "dev")
      .where("dev.user.userId = :id", { id: userid })
      .getMany();
    return allData;
  }

  public async GetUser(userid: string): Promise<UserAcount> {
    return await UserAcount.findOneBy({ userId: userid });
  }
  //#endregion

  //#region Alter Data
  /*
whats needed?:

change password: X
add device to user:
change device alias:

*/

  public async ChangePassword(userId: string, password: string): Promise<void> {
    await UserAcount.update(userId, { password: password });
  }

  //does not work yet!!

  public async AddDevicetoUser(
    userId: string,
    deviceid: string
  ): Promise<void> {
    await DatabaseConnector.INSTANCE.dataSource
      .createQueryBuilder()
      .update(Device)
      .set({ user: userId })
      .where("deviceID = :id", { id: deviceid })
      .execute();
  }

  //#endregion

  //#region  Delete Data
  /*
whats needed?:

delete admin: X
delete User: 
delete device:
delete data: X
*/

  public async DeleteAdministrator(adminId: number): Promise<void> {
    Administrator.delete({ adminId: adminId });
  }

  /*
these fail due to relation issues with administrator and data
  public async DeleteUser(userId: string): Promise<void> {
    UserAcount.delete({ userId: userId });
  }
  //fails due to relation with data
  public async DeleteDevice(deviceid: string): Promise<void> {
    Device.delete({ deviceId: deviceid });
  }
*/
  //works no relationship issues
  public async DeleteData(dataid: number): Promise<void> {
    Data.delete({ dataId: dataid });
  }
  //#endregion
}
