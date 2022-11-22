import { ObjectUtil } from "./../utils/ObjectUtil";
import { Administrator } from "./entities/Administrator";
import { Data } from "./entities/Data";
import { DatabaseConnector } from "./DatabaseConnector";
import { Device } from "./entities/Device";
import { TemporaryData } from "./entities/TemporaryData";
import { UserAccount } from "./entities/UserAccount";
import { PasswordReset } from "./entities/PasswordReset";
import { Equal, LessThan } from "typeorm";
import { validate } from "class-validator";
import { ContactForm } from "./entities/Contact";

export interface DeviceSpecificData {
  device_index: number;
  device_alias: string;
  data: Data[];
  lastData: TemporaryData;
}
/*
 *implementation:
 * every 24 hours execute cleanTemporaryData()
 * this wil thin out the temporary data and combine all data for the current day to data
 *
 * CREATE::
 * if validation fails for any Create... functions this will throw an Error
 * CreateUser is only one that will return userId
 * CreateData needs an existing device (deviceId)
 * CreateTempData is what devices will will need to use to insert new data.
 *
 *GET::
 * All Get functions will return an empty array if nothing is found.
 * exceptions:
 * GetData returns an object consisting of a combination of Device, Data[], TemporaryData for each device that this user has.
 * GetPasswordReset returns a boolean if the reset for this userAcount exists and is valid.
 *
 * ALTER::
 * EditAcount, addDevicetoUser, ChangeDeviceAlias: if device or user is not found this will throw an error.
 *
 * DELETE::
 *
 *
 *
 */

export class DataProcessor {
  //#region Create Data

  /**
   * creates a new device in the database
   * throws an Error if input is not valied
   * @param DeviceId string of 64 characters
   * @param alias undefined | string of 1 to 50 characters
   */
  public static async CreateDevice(
    DeviceId: string,
    alias?: string
  ): Promise<void> {
    const newDevice = new Device();
    newDevice.deviceId = DeviceId;
    if (alias) newDevice.friendlyName = alias;
    validate(newDevice).then(async (result) => {
      if (result.length <= 0) await newDevice.save();
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
      if (result.length <= 0) return (await UserAccount.save(newUser)).userId;
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
    validate(newData).then(async (result) => {
      if (result.length <= 0) await Data.save(newData);
    });
  }

  /**
   * creates TempData coupled to a device
   * throws an Error if input is not valied
   * @param deviceId string id of device
   * @param dataDay undefined | number power usage during day
   * @param dataNight undefined | number power useage during night
   */
  public static async CreateTempData(
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
      if (result.length <= 0) await TemporaryData.save(newData);
    });
  }

  /**
   *creates a new administator coupled to a user
   * @param userid number user id
   */
  public static async CreateAdministrator(userid: number): Promise<void> {
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
  public static async CreateContactForm(
    email: string,
    message: string,
    message_topic: string,
    firstname: string,
    lastname: string
  ): Promise<void> {
    const newContactForm = new ContactForm();
    newContactForm.email = email;
    newContactForm.message = message;
    newContactForm.message_topic = message_topic;
    newContactForm.firstname = firstname;
    newContactForm.lastname = lastname;
    validate(newContactForm).then(async (result) => {
      if (result.length <= 0) await ContactForm.save(newContactForm);
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
    email?: string
  ): Promise<void> {
    let user: UserAccount = await DataProcessor.GetUser(email, userId);
    const newPasswordReset = new PasswordReset();
    newPasswordReset.token = token;
    newPasswordReset.user = user;
    validate(newPasswordReset).then(async (result) => {
      if (result.length <= 0) await PasswordReset.save(newPasswordReset);
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
  public static async GetDevices(userid: number): Promise<Device[]> {
    const devices = await DatabaseConnector.INSTANCE.dataSource
      .getRepository(Device)
      .createQueryBuilder("device")
      .leftJoinAndSelect("device.user", "user")
      .where("user.userid = :id", { id: userid })
      .getMany();
    return devices;
  }

  /**
   * returns an array of objects for each device coupled to the user => look at interface DeviceSpecificData
   * if lastData does not contain a full TemporaryData object this means the day and night values are the difference calculated from start of day to current time
   *  @param userid number search by user id
   *  @param startDate Date | undefined start date if necessary
   * @param endDate Date | undefined end of date
   * @returns Promise<DeviceSpecificData[]>
   */
  public static async GetData(
    userid: number,
    startDate?: Date,
    endDate?: Date
  ): Promise<DeviceSpecificData[]> {
    let tempdata: TemporaryData[] = await DataProcessor.GetTempData(userid);
    let data: Data[] = [];
    if (startDate && endDate) {
      //UNTESTED
      data = await DatabaseConnector.INSTANCE.dataSource
        .getRepository(Data)
        .createQueryBuilder("data")
        .leftJoinAndSelect("data.device", "dev")
        .where("dev.user = :id", { id: userid })
        .andWhere("data.created_at < :endDate", { endDate: endDate })
        .andWhere("data.created_at > :startDate", { startDate: startDate })
        .getMany();
    } else {
      data = await DatabaseConnector.INSTANCE.dataSource
        .getRepository(Data)
        .createQueryBuilder("data")
        .leftJoinAndSelect("data.device", "dev")
        .where("dev.user = :id", { id: userid })
        .getMany();
    }
    let devices: Device[] = await this.GetDevices(userid);

    let completeData: DeviceSpecificData[] = [];
    devices.forEach((device) => {
      let currentDayData: TemporaryData = new TemporaryData();
      let filteredTempData: TemporaryData[] = tempdata.filter(
        (a) => a.device.device_index === device.device_index
      );
      if (filteredTempData.length >= 2) {
        //incredibly annoying thing the Day and Night would return as string,
        //but not be recognised as string, so i had to convert it to string and then back to integer.
        currentDayData.Day =
          parseInt(filteredTempData[0].Day.toString()) -
          parseInt(filteredTempData.reverse()[0].Day.toString());
        currentDayData.Night =
          parseInt(filteredTempData[0].Night.toString()) -
          parseInt(filteredTempData.reverse()[0].Night.toString());
      } else {
        currentDayData = null;
        if (filteredTempData[0] && !startDate && !endDate)
          currentDayData = filteredTempData[0];
      }
      const deviceData: DeviceSpecificData = {
        device_index: device.device_index,
        device_alias: device.friendlyName,
        data: data.filter((a) => a.device.device_index === device.device_index),
        lastData: currentDayData,
      };
      completeData.push(deviceData);
    });
    return completeData;
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
    number?: string
  ): Promise<UserAccount> {
    return ObjectUtil.firstNonUndefined<UserAccount>([
      await UserAccount.findOne({ where: { email: Equal(email) } }),
      await UserAccount.findOne({ where: { userId: Equal(userid) } }),
      await UserAccount.findOne({ where: { phone: Equal(number) } }),
    ]);
  }

  /**
   * returns the latest temporary data for the final column in the graphs
   * @param userid number user id
   * @returns Promise<TemporaryData>
   */
  //i think this is now unused
  public async GetLastData(userid: number): Promise<TemporaryData> {
    let allData = await DatabaseConnector.INSTANCE.dataSource
      .getRepository(TemporaryData)
      .createQueryBuilder("data")
      .leftJoinAndSelect("data.device", "dev")
      .where("dev.user = :id", { id: userid })
      .getMany();
    allData = allData.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

    return;
  }

  /**
   * withouth any parameters this will return all forms
   * @param message_topic undefined | string searches forms by topic
   * @param email undefined | string searches forms by email address
   * @returns Promise<ContactForm[]>
   */
  public static async GetContactForms(
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

  //not sure what input this will get (assuming it will get the token)
  /**
   * returns true or false if the token is valied or expired
   * @param token string the unique id of the reset
   * @returns Promise<boolean>
   */
  public static async GetPasswordReset(token: string): Promise<boolean> {
    let resetToken: PasswordReset = await PasswordReset.findOneBy({
      token: token,
    });
    let passwordResetAllowed: boolean = false;
    passwordResetAllowed =
      new Date().getTime() - resetToken.created_at.getTime() < 30 * 60 * 1000;
    DataProcessor.DeleteSpecificPasswordReset(token);
    return passwordResetAllowed;
  }
  /**
   * gets user specific TemporaryData
   * @param userid number id of a user
   * @returns Promise<Temporarydata[]>
   */
  private static async GetTempData(userid: number): Promise<TemporaryData[]> {
    let allData = await DatabaseConnector.INSTANCE.dataSource
      .getRepository(TemporaryData)
      .createQueryBuilder("temporary_data")
      .leftJoinAndSelect("temporary_data.device", "dev")
      .where("dev.user = :id", { id: userid })
      .getMany();
    return allData;
  }
  /**
   * gets device specific TemporaryData
   * @param index number index of device
   * @returns Promise<TemporaryData[]>
   */
  private static async GetAllTempData(index: number): Promise<TemporaryData[]> {
    let allData = await DatabaseConnector.INSTANCE.dataSource
      .getRepository(TemporaryData)
      .createQueryBuilder("temporary_data")
      .select()
      .where("deviceDeviceIndex = :index", { index: index })
      .getMany();
    return allData;
  }
  //#endregion

  //#region Alter Data
  //possibly redundant.
  //TODO: add validation
  /**
   * changes a single password in the database
   * @param userId number user id
   * @param password  string password of minimum 5 characters
   */
  public static async ChangePassword(
    userId: number,
    password: string
  ): Promise<void> {
    let User: UserAccount = await UserAccount.findOneBy({ userId: userId });
    if (User == undefined) throw new Error("User Does not exist");
    User.password = password;
    User.save();
  }

  //TODO: add validation
  // test if password change alters users password by hashing it twice
  /**
   * @param userid number user id
   * @param firstname  string of 3 to 30 characters
   * @param lastname string of 3 to 30 characters
   * @param email string of max 50 characters needs to be a valid email
   * @param password string of minimum 5 characters
   * @param phone undefined | string of 12 characters that needs to start with +32
   * @returns Promise<void>
   */
  public static async EditAcount(
    userid: number,
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    phone?: string
  ): Promise<void> {
    let userExists = await UserAccount.findAndCountBy({ userId: userid });
    if (userExists[1] < 1)
      throw new Error(`Acount does not exist. looking for acount: ${userid}`);
    await UserAccount.update(userid, {
      firstname: firstname,
      lastname: lastname,
      password: password,
      email: email,
      phone: phone,
    });
  }

  /**
   * couple an existing Device to an existing User
   * @param userId number user id
   * @param deviceid string unique id of device
   */
  public static async AddDevicetoUser(
    userId: number,
    deviceid: string
  ): Promise<void> {
    let user = await UserAccount.findOneBy({ userId: userId });
    let device = await Device.findOneBy({ deviceId: deviceid });
    if (user == undefined || device == undefined)
      throw new Error("Either Device or User does not exist or was not found.");
    await Device.update({ deviceId: deviceid }, { user: user });
  }

  //TODO: add validation
  /**
   * change alternate name for device
   * @param device_index number device index
   * @param alias string of 1 to 50 characters
   */
  public static async ChangeDeviceAlias(
    device_index: number,
    alias: string
  ): Promise<void> {
    let device: Device = await Device.findOneBy({ device_index: device_index });
    if (device == undefined) throw new Error("Device was not found.");
    Device.update({ device_index: device_index }, { friendlyName: alias });
  }
  //#endregion

  //#region  Delete Data
  /**
   * deletes a single administrator from database
   * @param adminId number
   */
  public static async DeleteAdministrator(adminId: number): Promise<void> {
    Administrator.delete({ adminId: adminId });
  }

  //fails if administrator is not removed first
  /**
   * deletes a single user form the database
   * @param userId number
   */
  public static async DeleteUser(userId: number): Promise<boolean> {
    return (await UserAccount.delete({ userId: userId })).affected >= 1;
  }

  //fails if data is not removed first
  /**
   * deletes a single device from database. could fail still testing
   * @param deviceid string
   */
  public static async DeleteDevice(deviceid: string): Promise<void> {
    Device.delete({ deviceId: deviceid });
  }

  /**
   * deletes a single data row
   * @param dataid number
   */
  public static async DeleteData(dataid: number): Promise<void> {
    Data.delete({ dataId: dataid });
  }
  /**
   * deletes a single contact form.
   * @param id number
   */
  public static async DeleteContactForm(id: number): Promise<void> {
    ContactForm.delete({ contactId: id });
  }

  /**
   * deletes all data from 24 hours prior,
   * collects all temporary data, add a single data row per device,
   *  and deletes all data except for latest entry
   */
  public static async cleanTemporaryData(): Promise<void> {
    await this.DeleteExpiredTemporaryData();
    let allDevices: Device[] = await Device.find();

    allDevices.map(async (specificDevice, index) => {
      setTimeout(async () => {
        let dataFromSpecificDevice: TemporaryData[] =
          await DataProcessor.GetAllTempData(specificDevice.device_index);
        if (dataFromSpecificDevice.length > 0) {
          //sort all temporary data by date
          dataFromSpecificDevice = dataFromSpecificDevice.sort((a, b) =>
            a.created_at < b.created_at ? 1 : -1
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
        }
      }, 3_000 * (index + 1));
    });
  }

  /**
   * deletes a single entry in temporary data
   * @param index number index of the temporary data
   */
  private static async DeleteSpecificTemporaryData(
    index: number
  ): Promise<void> {
    TemporaryData.delete({ index: index });
  }
  /**
   * deletes all Temporary Data older than 24 hours
   */
  private static async DeleteExpiredTemporaryData(): Promise<void> {
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
  public static async DeleteExpiredPasswordResets() {
    const expiringDate: Date = new Date(new Date().getTime() - 30 * 60 * 1000);

    DatabaseConnector.INSTANCE.dataSource
      .getRepository(PasswordReset)
      .delete({ created_at: LessThan(expiringDate) });
  }
  /**
   * deletes a single password reset token in database
   * @param token string
   */
  private static async DeleteSpecificPasswordReset(token: string) {
    PasswordReset.delete({ token: token });
  }
  //#endregion
}