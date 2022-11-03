import { ObjectUtil } from "./../utils/ObjectUtil";
import { Administrator } from "./entities/Administrator";
import { Data } from "./entities/Data";
import { DatabaseConnector } from "./DatabaseConnector";
import { Device } from "./entities/Device";
import { TemporaryData } from "./entities/TemporaryData";
import { ContactForm } from "./entities/contact";
import { UserAccount } from "./entities/UserAccount";
import { Equal } from "typeorm";
export class DataProcessor {
  //#region Create Data
  public static async CreateDevice(DeviceId: string, alias?: string): Promise<void> {
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
    //tested => await users.save(newUser);
  }

  private static async CreateData(
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

  public static async CreatetempData(
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

  public static async CreateAdministrator(userid: number): Promise<void> {
    let user = await UserAccount.findOneBy({ userId: userid });
    Administrator.insert({ user });
  }

  public static async CreateContactForm(
    email: string,
    message: string,
    message_topic: string
  ): Promise<void> {
    let contactForm = new ContactForm();
    contactForm.email = email;
    contactForm.message = message;
    contactForm.message_topic = message_topic;
    contactForm.save();
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

 /**
  * Get a user by email or userid, and return the first one that's not undefined.
  * @param {string} [email] - string,
  * @param {number} [userid] - number
  * @param {number} [number] - number
  * @returns The first non-undefined value from the array.
  */
  public static async GetUser(
    email?: string,
    userid?: number,
    number?: string
  ): Promise<UserAccount> {
    return ObjectUtil.firstNonUndefined([
      await UserAccount.findOne({where: {email: Equal(email)}}),
      await UserAccount.findOne({where: {userId: Equal(userid)}}),
      await UserAccount.findOne({where: {phone:  Equal(number)}}),
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

  public static async GetContactForms(
    message_topic?: string,
    email?: string
  ): Promise<ContactForm[]> {
    if (message_topic)
      return await ContactForm.findBy({ message_topic: message_topic });
    if (email) return await ContactForm.findBy({ email: email });
    return await ContactForm.find();
  }
  //#endregion

  //#region Alter Data
  //possibly redundant.
  public static async ChangePassword(userId: number, password: string): Promise<void> {
    let User: UserAccount = await UserAccount.findOneBy({ userId: userId });
    User.password = password;
    User.save();
  }

  public static async EditAcount(
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

  public static async AddDevicetoUser(
    userId: number,
    deviceid: string
  ): Promise<void> {
    let user = await UserAccount.findOneBy({ userId: userId });
    await Device.update({ deviceId: deviceid }, { user: user });
  }

  //change alternate name for device
  public static async ChangeDeviceAlias(
    device_index: number,
    alias: string
  ): Promise<void> {
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

  public static async DeleteContactForm(id: number): Promise<void> {
    ContactForm.delete({ contactId: id });
  }

  //delete all temporary data from specific device
  private static async CleantempData(deviceIndex: number): Promise<void> {
    DatabaseConnector.INSTANCE.dataSource
      .createQueryBuilder()
      .delete()
      .from(TemporaryData)
      .where("deviceDeviceIndex: = :id", { id: deviceIndex })
      .execute();
  }
  //#endregion
}
