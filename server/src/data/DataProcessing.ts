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
import { validate } from "class-validator";
export class DataProcessor {
  //#region Create Data

  /**
   * creates a new device in the database
   * throws an Error if input is not valied
   * @param DeviceId string of 64 characters
   * @param alias undefined | string of 1 to 50 characters
   */
  public async CreateDevice(DeviceId: string, alias?: string): Promise<void> {
    const newDevice = new Device();
    newDevice.deviceId = DeviceId;
    if (alias) newDevice.friendlyName = alias;
    validate(newDevice).then(async (result) => {
      if (result.length > 0) {
        throw new Error("device validation failed:\n" + result.toString());
      } else {
        await newDevice.save();
      }
    });
  }

  /**
   * creates a new user in the database, returns the new user id
   * throws an Error if input is not valied
   * @param firstname  string of 3 to 30 characters
   * @param lastname string of 3 to 30 characters
   * @param email string of max 50 characters needs to be a valid email
   * @param password string of minimum 5 characters
   * @param phonenumber string of 12 characters needs to start with +32
   * @param devices undefined | Device[ ]
   * @returns Promise<number>
   */
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
    return validate(newUser).then(async (result) => {
      if (result.length > 0) {
        throw new Error("validation for user failed:" + result);
      } else {
        return (await UserAccount.save(newUser)).userId;
      }
    });
  }

  /**
   * creates new Data coupled to a specific device
   * throws an Error if input is not valied
   * @param deviceId string id from device
   * @param date Date when data was created
   * @param dataDay undefined | number amount of power used during day time
   * @param DataNight undefined | number amount of power used during night time
   */
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
    validate(newData).then(async (result) => {
      if (result.length > 0) {
        throw new Error("validation for Data failed: " + result);
      } else {
        await Data.save(newData);
      }
    });
  }
  /**
   * creates TempData coupled to a device
   * throws an Error if input is not valied
   * @param deviceId string id of device
   * @param dataDay undefined | number power usage during day
   * @param dataNight undefined | number power useage during night
   */
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
    validate(newData).then(async (result) => {
      if (result.length > 0) {
        throw new Error("validation for temporary Data failed: " + result);
      } else {
        await TemporaryData.save(newData);
      }
    });
  }

  /**
   *creates a new administator coupled to a user
   * @param userid number user id
   */
  public async CreateAdministrator(userid: number): Promise<void> {
    let user = await UserAccount.findOneBy({ userId: userid });
    Administrator.insert({ user });
  }
  /**
   * creates a new contactform.
   * throws an Error if input is not valied
   * @param email string valied email adress of max 50 characters
   * @param message string of max 1000 characters
   * @param message_topic string of 4 to 100 characters
   */
  public async CreateContactForm(
    email: string,
    message: string,
    message_topic: string
  ): Promise<void> {
    const newContactForm = new ContactForm();
    newContactForm.email = email;
    newContactForm.message = message;
    newContactForm.message_topic = message_topic;
    validate(newContactForm).then(async (result) => {
      if (result.length > 0) {
        throw new Error("validation for contactForm failed: " + result);
      } else {
        ContactForm.save(newContactForm);
      }
    });
  }
  /**
   *  you need at least one of the optional values to use this function.
   * throws an Error if input is not valied.
   * @param token string serves as unique id for reset
   * @param userId undefined | number user id
   * @param email undefined | string email adress of a user
   * @param phoneNumber undefined | number phonenumber of user
   */
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
    validate(newPasswordReset).then(async (result) => {
      if (result.length > 0) {
        throw new Error("validation for password reset failed: " + result);
      } else {
        Password_Reset.save(newPasswordReset);
      }
    });
  }
  //#endregion

  //#region get Data
  /**
   * returns administrator object if user is an administrator
   * @param userId number search by user id
   * @returns Promise<Administrator>
   */
  public static async GetAdministrator(userId: number): Promise<Administrator> {
    let AdminQuery = DatabaseConnector.INSTANCE.dataSource
      .getRepository(Administrator)
      .createQueryBuilder("administrator")
      .innerJoinAndSelect("administrator.user", "user")
      .where("user.userid = :adminid", { adminid: userId })
      .getOne();
    return await AdminQuery;
  }
  /**
   * returns all devices from a specific user
   * @param userid number search by user id
   * @returns Promise<Device[]>
   */
  public async GetDevices(userid: number): Promise<Device[]> {
    const devices = await DatabaseConnector.INSTANCE.dataSource
      .getRepository(Device)
      .createQueryBuilder("device")
      .leftJoinAndSelect("device.user", "user")
      .where("user.userid = :id", { id: userid })
      .getMany();
    return devices;
  }
  /**
   * return all data from a specific users devices
   * @param userid number search by user id
   * @returns Promise<Data[]>
   */
  public async GetData(userid: number): Promise<Data[]> {
    let allData = await DatabaseConnector.INSTANCE.dataSource
      .getRepository(Data)
      .createQueryBuilder("data")
      .leftJoinAndSelect("data.device", "dev")
      .where("dev.user = :id", { id: userid })
      .getMany();
    return allData;
  }
  /**
   *returns a specific user
   * @param email string search user by email address
   * @param userid number search user by index
   * @param number number search user by phonenumber
   * @returns Promise<UserAccounts>
   */
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
  /**
   * returns the latest temporary data for the final column in the graphs
   * @param userid number user id
   * @returns Promise<TemporaryData>
   */
  public async GetLastData(userid: number): Promise<TemporaryData> {
    let allData = await DatabaseConnector.INSTANCE.dataSource
      .getRepository(TemporaryData)
      .createQueryBuilder("data")
      .leftJoinAndSelect("data.device", "dev")
      .where("dev.user = :id", { id: userid })
      .getMany();
    return allData.reverse()[0];
  }

  /**
   * withouth any parameters this will return all forms
   * @param message_topic undefined | string searches forms by topic
   * @param email undefined | string searches forms by email address
   * @returns Promise<ContactForm[]>
   */
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
  /**
   * returns true or false if the token is valied or expired
   * @param token string the unique id of the reset
   * @returns Promise<boolean>
   */
  public async GetPasswordReset(token: string): Promise<boolean> {
    let resetToken: Password_Reset = await Password_Reset.findOneBy({
      token: token,
    });
    let passwordResetAllowed: boolean = false;
    passwordResetAllowed =
      new Date().getTime() - resetToken.created_at.getTime() < 30 * 60 * 1000;
    this.DeleteSpecificPasswordReset(token);
    return passwordResetAllowed;
  }
  /**
   * gets all temporary data connected a specific device
   * @param deviceIndex number index of a device
   * @returns Promise<Temporarydata[]>
   */
  private async GetTempData(deviceIndex: number): Promise<TemporaryData[]> {
    let allData = await DatabaseConnector.INSTANCE.dataSource
      .getRepository(TemporaryData)
      .createQueryBuilder("temporary_data")
      .select()
      .where("deviceDeviceIndex = :devindex", { devindex: deviceIndex })
      .getMany();
    return allData;
  }
  //#endregion

  //#region Alter Data
  //possibly redundant.
  //TODO: add validation
  /**
   * @param userId number user id
   * @param password  string password of minimum 5 characters
   */
  public async ChangePassword(userId: number, password: string): Promise<void> {
    let User: UserAccount = await UserAccount.findOneBy({ userId: userId });
    User.password = password;
    User.save();
  }

  //TODO: add validation
  /**
   * @param userid number user id
   * @param firstname  string of 3 to 30 characters
   * @param lastname string of 3 to 30 characters
   * @param email string of max 50 characters needs to be a valid email
   * @param password string of minimum 5 characters
   * @param phonenumber undefined | string of 12 characters that needs to start with +32
   * @returns Promise<void>
   */
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

  /**
   *
   * @param userId number user id
   * @param deviceid string unique id of device
   */
  public async AddDevicetoUser(
    userId: number,
    deviceid: string
  ): Promise<void> {
    let user = await UserAccount.findOneBy({ userId: userId });
    await Device.update({ deviceId: deviceid }, { user: user });
  }

  //TODO: add validation
  /**
   * change alternate name for device
   * @param device_index number device index
   * @param alias string of 1 to 50 characters
   */
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
  /**
   * deletes a single data row
   * @param dataid number
   */
  public async DeleteData(dataid: number): Promise<void> {
    Data.delete({ dataId: dataid });
  }
  /**
   * deletes a single contact form.
   * @param id number
   */
  public async DeleteContactForm(id: number): Promise<void> {
    ContactForm.delete({ contactId: id });
  }

  //god this is awfull
  /**
   * deletes all data from 24 hours prior,
   * collects all temporary data, add a single data row per device,
   *  and deletes all data except for latest entry
   */
  public async cleanTemporaryData(): Promise<void> {
    await this.DeleteExpiredTemporaryData();
    let allDevices: Device[] = await Device.find();
    allDevices.map(async (specificDevice) => {
      let dataFromSpecificDevice: TemporaryData[] = await this.GetTempData(
        specificDevice.device_index
      );
      //sort all temporary data by date
      dataFromSpecificDevice = dataFromSpecificDevice.sort((a, b) =>
        a.created_at > b.created_at ? 1 : -1
      );
      //if temporary data array is more than 1(has been updated at least once since cleanup) use it to calculate usage
      if (dataFromSpecificDevice.length > 1) {
        let allDayData: number[] = [];
        let allNightData: number[] = [];
        dataFromSpecificDevice.map((specificData) => {
          allDayData.push(specificData.Day);
          allNightData.push(specificData.Night);
        });
        //get diferential between first and last entry
        const totalDayUsage: number = allDayData.at(-1) - allDayData.at(0);
        const totalNightUsasge: number = allNightData.at(-1) - allDayData.at(0);

        await this.CreateData(
          specificDevice.deviceId,
          new Date(),
          totalDayUsage,
          totalNightUsasge
        );
      }
      //delete all temp data except for newest row.
      dataFromSpecificDevice.shift();
      dataFromSpecificDevice.map(
        async (data) => await this.DeleteSpecificTemporaryData(data.index)
      );
    });
  }
  /**
   * deletes a single entry in temporary data
   * @param index number index of the temporary data
   */
  private async DeleteSpecificTemporaryData(index: number): Promise<void> {
    TemporaryData.delete({ index: index });
  }
  /**
   * deletes all data older than 24 hours
   */
  private async DeleteExpiredTemporaryData(): Promise<void> {
    const expiringDate: Date = new Date(
      new Date().getTime() - 24 * 60 * 60 * 1000
    );
    await DatabaseConnector.INSTANCE.dataSource
      .getRepository(TemporaryData)
      .delete({ created_at: LessThan(expiringDate) });
  }

  //tested garbage code :-|
  /**
   * removes all password reset rows that are older than 30 minutes
   */
  public async DeleteExpiredPasswordResets() {
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
