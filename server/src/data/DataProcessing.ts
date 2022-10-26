import { ObjectUtil } from "./../utils/ObjectUtil";
import { Administrator } from "./entities/Administrator";
import { Data } from "./entities/Data";
import { DatabaseConnector } from "./DatabaseConnector";
import { Device } from "./entities/Device";
import { TemporaryData } from "./entities/TemporaryData";
import { ContactForm } from "./entities/contact";
import { UserAccount } from "./entities/UserAccount";
import { Password_Reset } from "./entities/Password_reset";
import { Equal, LessThan } from "typeorm";
export class DataProcessor {
  //#region Create Data
  public async CreateDevice(DeviceId: string, alias?: string): Promise<void> {
    const newDevice = new Device();
    newDevice.deviceId = DeviceId;
    if (alias) newDevice.friendlyName = alias;
    await newDevice.save();
  }

  public static async CreateUser(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phonenumber: string,
    devices: Device[] = []
  ): Promise<number> {
    const newUser = new UserAccount();
    newUser.email = email;
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.password = password;
    newUser.phone = phonenumber;
    newUser.device = devices;
    return (await UserAccount.save(newUser)).userId;
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

  public async CreateTempData(
    deviceId: string,
    dataDay?: number,
    dataNight?: number
  ): Promise<void> {
    let device: Device = await Device.findOneBy({ deviceId: deviceId });
    const newData = new TemporaryData();
    newData.device = device;
    if (dataDay) newData.Day = dataDay;
    if (dataNight) newData.Night = dataNight;
    newData.save();
  }

  public async CreateAdministrator(userid: number): Promise<void> {
    let user = await UserAccount.findOneBy({ userId: userid });
    Administrator.insert({ user });
  }

  public async CreateContactForm(
    email: string,
    message: string,
    message_topic: string
  ): Promise<void> {
    const newContactForm = new ContactForm();
    newContactForm.email = email;
    newContactForm.message = message;
    newContactForm.message_topic = message_topic;
    ContactForm.save(newContactForm);
  }

  public async CreatePasswordReset(
    token: string,
    userId?: number,
    email?: string,
    phoneNumber?: number
  ): Promise<void> {
    let user: UserAccount = await DataProcessor.GetUser(
      email,
      userId,
      phoneNumber
    );
    const newPasswordReset = new Password_Reset();
    newPasswordReset.token = token;
    newPasswordReset.user = user;
    Password_Reset.save(newPasswordReset);
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

  public static async GetUser(
    email?: string,
    userid?: number,
    number?: number
  ): Promise<UserAccount> {
    return ObjectUtil.firstNonUndefined([
      await UserAccount.findOneBy({ email: email }),
      await UserAccount.findOneBy({ userId: userid }),
    ]);
  }
  public async GetLastData(userid: number): Promise<TemporaryData> {
    let allData = await DatabaseConnector.INSTANCE.dataSource
      .getRepository(TemporaryData)
      .createQueryBuilder("data")
      .leftJoinAndSelect("data.device", "dev")
      .where("dev.user = :id", { id: userid })
      .getMany();
    return allData.reverse()[0];
  }

  //withouth any variable it will return all contactForms
  public async GetContactForms(
    message_topic?: string,
    email?: string
  ): Promise<ContactForm[]> {
    if (message_topic || email) {
      return ObjectUtil.firstNonUndefined([
        await ContactForm.find({
          where: { message_topic: Equal(message_topic) },
        }),
        await ContactForm.find({ where: { email: Equal(email) } }),
      ]);
    }
    return await ContactForm.find();
  }

  //not sure what input this will get (assuming it will get a token)
  //returns true, or false if the token is expired(older than 30 mins)
  public async GetPasswordReset(token: string): Promise<boolean> {
    let resetToken: Password_Reset = await Password_Reset.findOneBy({
      token: token,
    });
    let passwordResetAllowed: boolean =
      new Date().getTime() - resetToken.created_at.getTime() < 30 * 60 * 1000;
    this.DeleteSpecificPasswordReset(token);
    return passwordResetAllowed;
  }
  //#endregion

  //#region Alter Data
  //possibly redundant.
  public async ChangePassword(userId: number, password: string): Promise<void> {
    let User: UserAccount = await UserAccount.findOneBy({ userId: userId });
    User.password = password;
    User.save();
  }

  public async EditAcount(
    userid: number,
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    phone?: string
  ): Promise<void> {
    await UserAccount.update(userid, {
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
    let user = await UserAccount.findOneBy({ userId: userId });
    await Device.update({ deviceId: deviceid }, { user: user });
  }
  //change alternate name for device
  public async ChangeDeviceAlias(
    device_index: number,
    alias: string
  ): Promise<void> {
    Device.update({ device_index: device_index }, { friendlyName: alias });
  }
  //#endregion

  //#region  Delete Data
  public async DeleteAdministrator(adminId: number): Promise<void> {
    Administrator.delete({ adminId: adminId });
  }

  //fails if administrator is not removed first
  public static async DeleteUser(userId: number): Promise<void> {
    UserAccount.delete({ userId: userId });
  }
  //fails if data is not removed first
  public async DeleteDevice(deviceid: string): Promise<void> {
    Device.delete({ deviceId: deviceid });
  }

  public async DeleteData(dataid: number): Promise<void> {
    Data.delete({ dataId: dataid });
  }

  public async DeleteContactForm(id: number): Promise<void> {
    ContactForm.delete({ contactId: id });
  }

  //delete all temporary data from specific device
  private async CleantempData(deviceIndex: number): Promise<void> {
    DatabaseConnector.INSTANCE.dataSource
      .createQueryBuilder()
      .delete()
      .from(TemporaryData)
      .where("deviceDeviceIndex: = :id", { id: deviceIndex })
      .execute();
  }

  //tested garbage code :-|
  public async DeleteExpiredPasswordReset() {
    const expiringDate: Date = new Date(new Date().getTime() - 30 * 60 * 1000);
    DatabaseConnector.INSTANCE.dataSource
      .getRepository(Password_Reset)
      .delete({ created_at: LessThan(expiringDate) });
  }

  private async DeleteSpecificPasswordReset(token: string) {
    Password_Reset.delete({ token: token });
  }
  //#endregion
}
