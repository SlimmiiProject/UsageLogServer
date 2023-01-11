import { Device } from "./entities/Device";
import { ObjectUtil } from "./../utils/ObjectUtil";
import { Administrator } from "./entities/Administrator";
import { Data } from "./entities/Data";
import { DatabaseConnector } from "./DatabaseConnector";
import { TemporaryData } from "./entities/TemporaryData";
import { GraphColors, UserAccount } from "./entities/UserAccount";
import { PasswordReset } from "./entities/PasswordReset";
import { DeleteResult, Equal, LessThan } from "typeorm";
import { validate } from "class-validator";
import { ContactForm } from "./entities/Contact";
import { Logfile } from "./entities/Logfile";

export interface DeviceSpecificData {
  device_index: number;
  deviceId: string;
  device_alias: string;
  data: Data[];
  colorDay?: GraphColors;
  colorNight?: GraphColors;
}

export interface ILog {
  id?: number;
  account_id: number;
  date: Date;
  description: string;
  ipaddress: string;
}

export interface IUserData {
  userId: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  isAdmin: boolean;
}

export interface IDevice {
  index: number;
  alias: string;
  owner: number;
  id: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
}

export interface ILogData {
  id: number;
  date: Date;
  description: string;
  ipaddress: string;
  account_id?: number | undefined;
}
export class DataProcessor {
  //#region Create Data

  /**
   * creates a new device in the database
   * throws an Error if input is not valid
   * @param deviceId string of 64 characters
   * @param alias undefined | string of 1 to 50 characters
   */
  public static createDevice = async (
    deviceId: string,
    alias?: string
  ): Promise<void> => {
    const newDevice = Device.createDevice(deviceId, alias);
    newDevice.save();
  };

  /**
   * creates a new user in the database, returns the new user id
   * throws an Error if input is not valid
   * @param firstname  string of 3 to 30 characters
   * @param lastname string of 3 to 30 characters
   * @param email string of max 50 characters needs to be a valid email
   * @param password string of minimum 5 characters
   * @param phonenumber string of 12 characters needs to start with +32
   * @param devices undefined | Device[ ]
   * @returns Promise<number>
   */
  public static createUser = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phonenumber: string,
    devices: Device[] = []
  ): Promise<number> => {
    const newUser = UserAccount.createUser(
      firstname,
      lastname,
      email,
      phonenumber,
      password
    ).setDevices(devices);
    return validate(newUser).then(async (result) => {
      if (result.length <= 0) return (await newUser.save()).userId;
    });
  };

  /**
   * Getting all the users from the database and returning them in a IUserData[]t.
   */
  public static getAllUsers = async (skip: number) => {
    const users: UserAccount[] = await UserAccount.find({
      skip: skip,
      take: 10,
      select: {
        password: false,
      },
    });
    let response: IUserData[] = [];

    for await (let user of users) {
      let newValue: IUserData = {
        userId: user.userId,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
        isAdmin: await user.isAdmin(),
      };
      response.push(newValue);
    }

    const count = await UserAccount.count();
    return { data: response, pages: Math.ceil(count/10) };
  };

  /**
   * creates new Data coupled to a specific device
   * throws an Error if input is not valid
   * @param deviceId string id from device
   * @param date Date when data was created
   * @param dataDay undefined | number amount of power used during day time
   * @param dataNight undefined | number amount of power used during night time
   */
  public static createHourlyData = async (
    deviceId: string,
    dataDay?: number,
    dataNight?: number,
  ): Promise<void> => {
    const dataDevice = await Device.findOne({
      where: { deviceId: Equal(deviceId) },
    });
    if (!ObjectUtil.isSet(dataDevice)) return;

    const newData = Data.createData(dataDevice, dataDay, dataNight);
    validate(newData).then(async (result) => {
      if (result.length <= 0) await Data.save(newData);
    });
  };

  /**
   * creates TempData coupled to a device
   * throws an Error if input is not valid
   * @param deviceId string id of device
   * @param dataDay undefined | number power usage during day
   * @param dataNight undefined | number power useage during night
   */
  public static createTempData = async (
    deviceId: string,
    dataDay?: number,
    dataNight?: number,
  ): Promise<void> => {
    const device = await Device.findOne({
      where: { deviceId: Equal(deviceId) },
    });
    if (!ObjectUtil.isSet(device)) return;

    const newData = TemporaryData.createTempData(device, dataDay, dataNight);
    validate(newData).then(async (result) => {
      if (result.length <= 0) await newData.save();
    });
  };

  /**
   *creates a new administator coupled to a user
   * @param userId number user id
   */
  public static createAdministrator = async (userId: number): Promise<void> => {
    const user = await UserAccount.findOne({
      where: { userId: Equal(userId) },
    });
    if (ObjectUtil.isSet(user)) Administrator.insert({ user });
  };

  /**
   * creates a new contactform.
   * throws an Error if input is not valid
   * @param email string valid email adress of max 50 characters
   * @param message string of max 1000 characters
   * @param message_topic string of 4 to 100 characters
   */
  public static createContactForm = async (
    firstname: string,
    lastname: string,
    email: string,
    message: string,
    message_topic: string
  ): Promise<void> => {
    const newContactForm = ContactForm.createContactForm(
      firstname,
      lastname,
      email,
      message_topic,
      message
    );
    validate(newContactForm).then(async (result) => {
      if (result.length <= 0) await newContactForm.save();
    });
  };

  /**
   *  you need at least one of the optional values to use this function.
   * throws an Error if input is not valid.
   * @param token string serves as unique id for reset
   * @param userId undefined | number user id
   * @param email undefined | string email adress of a user
   * @param phoneNumber undefined | number phonenumber of user
   */
  public static createPasswordReset = async (token: string, userAccount: UserAccount): Promise<string> => {
    const newPasswordReset = PasswordReset.createPasswordReset(userAccount, token);
    return validate(newPasswordReset).then(async (result) => {
      if (result.length <= 0) return (await newPasswordReset.save()).token;
    });
  }
  //#endregion

  //#region Get Data

  /**
   * returns administrator object if user is an administrator
   * @param userId number search by user id
   * @returns Promise<Administrator>
   */
  public static getAdministrator = async (
    userId: number
  ): Promise<Administrator> => {
    // let AdminQuery = DatabaseConnector.INSTANCE.dataSource
    //   .getRepository(Administrator)
    //   .createQueryBuilder("administrator")
    //   .innerJoinAndSelect("administrator.user", "user")
    //   .where("user.userid = :adminid", { adminid: userId })
    //   .getOne();

    return await Administrator.findOne({
      relations: {
        user: true,
      },
      where: {
        user: {
          userId: userId,
        },
      },
    });

    // return await AdminQuery
  };

  /**
   * returns all devices from a specific user
   * @param userId number search by user id
   * @returns Promise<Device[]>
   */
  public static getDevices = async (userId: number): Promise<Device[]> => {
    return await Device.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          userId: userId,
        },
      },
    });
  };

  /* A static method that returns a promise of an array of Device objects. */
  public static getAllDevices = async (skip: number) => {
    const devices: Device[] = await Device.find({
      skip: skip,
      take: 10,
      relations: {
        user: true,
      },
    });
    const newDevices: IDevice[] = [];

    for (let device of devices) {
      let owner: number = undefined;
      let firstname: string = "No";
      let lastname: string = "User";

      if (device.user !== null) {
        owner = device.user.userId;
        firstname = device.user.firstname;
        lastname = device.user.lastname;
      }

      newDevices.push({
        index: device.device_index,
        id: device.deviceId,
        alias: device.friendlyName,
        owner: owner,
        firstname: firstname,
        lastname: lastname,
      });
    }
    const count = await Device.count();
    return {data: newDevices, pages: Math.ceil(count / 10)};
  };

  public static getTempEntry = async (deviceId: string) => {
    const device = await this.getDevice(deviceId);
    return await TemporaryData.findOne({ where: { device: Equal(device) } });
  };

  public static getDevice = async (deviceId: string) => await Device.findOne({ where: { deviceId: Equal(deviceId) } });

  /**
   * returns an array of objects for each device coupled to the user => look at interface DeviceSpecificData
   * if lastData does not contain a full TemporaryData object this means the day and night values are the difference calculated from start of day to current time
   *  @param userId number search by user id
   *  @param startDate Date | undefined start date if necessary
   * @param endDate Date | undefined end of date
   * @returns Promise<DeviceSpecificData[]>
   */
  public static getData = async (
    userId: number,
    startDate?: Date,
    endDate?: Date
  ): Promise<DeviceSpecificData[]> => {
    let user: UserAccount = await DataProcessor.getUser(undefined, userId);
    let devices: Device[] = await this.getDevices(userId);
    let data: Data[] = [];
    if (startDate && endDate) {
      //UNTESTED
      data = await DatabaseConnector.INSTANCE.dataSource
        .getRepository(Data)
        .createQueryBuilder("data")
        .leftJoinAndSelect("data.device", "dev")
        .where("dev.user = :id", { id: userId })
        .andWhere("data.created_at < :endDate", { endDate: endDate })
        .andWhere("data.created_at > :startDate", { startDate: startDate })
        .getMany();
    } else {
      data = await DatabaseConnector.INSTANCE.dataSource
        .getRepository(Data)
        .createQueryBuilder("data")
        .leftJoinAndSelect("data.device", "dev")
        .where("dev.user = :id", { id: userId })
        .getMany();
    }

    let completeData: DeviceSpecificData[] = [];

    devices.forEach((device) => {
      const deviceData: DeviceSpecificData = {
        device_index: device.device_index,
        device_alias: device.friendlyName,
        deviceId: device.deviceId,
        data: data.filter((a) => a.device.device_index === device.device_index),
        colorDay: user.colorDay,
        colorNight: user.colorNight,
      };
      completeData.push(deviceData);
    });
    return completeData;
  };

  /**
   *returns a specific user
   * @param email string search user by email address
   * @param userid number search user by index
   * @param number number search user by phonenumber
   * @returns Promise<UserAccounts>
   */
  public static getUser = async (
    email?: string,
    userid?: number,
    number?: string
  ): Promise<UserAccount> =>
    ObjectUtil.firstNonUndefined<UserAccount>([
      await UserAccount.findOne({ where: { email: Equal(email) } }),
      await UserAccount.findOne({ where: { userId: Equal(userid) } }),
      await UserAccount.findOne({ where: { phone: Equal(number) } }),
    ]);

  /**
   * withouth any parameters this will return all forms
   * @param message_topic undefined | string searches forms by topic
   * @param email undefined | string searches forms by email address
   * @returns Promise<ContactForm[]>
   */
  public static GetContactForms = async (
    message_topic?: string,
    email?: string
  ): Promise<ContactForm[]> => {
    if (message_topic || email) {
      return ObjectUtil.firstNonUndefined([
        await ContactForm.find({
          where: { message_topic: Equal(message_topic) },
        }),
        await ContactForm.find({ where: { email: Equal(email) } }),
      ]);
    }

    return await ContactForm.find();
  };

  // TODO Define logic in a wrapper
  /**
   * returns true or false if the token is valied or expired
   * deletes the token after checking if it is valid.
   * @param token string the unique id of the reset
   * @returns Promise<boolean>
   */
  public static GetPasswordReset = async (token: string) => {
    const resetToken: PasswordReset[] = await PasswordReset.find(
      {
        relations: {
          user: true
        },
        where: { token: Equal(token) }
      });

    return resetToken[0];
  }
  //#endregion

  //#region Alter Data
  /**
   * TODO:
   * add validation to updating functions
   */

  /**
   * changes a single password in the database
   * @param userId number user id
   * @param password  string password of minimum 5 characters
   */
  public static ChangePassword = async (
    userId: number,
    password: string
  ): Promise<void> => {
    let user: UserAccount = await UserAccount.findOne({
      where: { userId: Equal(userId) },
    });
    if (!ObjectUtil.isSet(user)) return;

    user.setPassword(password).save();
  };

  // TODO: add validation
  // TODO: Test if password change alters users password by hashing it twice
  /**
   * changes the values of a single user object in database.
   * @param userid number user id
   * @param firstname  string of 3 to 30 characters
   * @param lastname string of 3 to 30 characters
   * @param email string of max 50 characters needs to be a valid email
   * @param phone undefined | string of 12 characters that needs to start with +32
   * @param colorDay GraphColor | undefined enum of colors
   * @param colorNight | undefined enum of colors
   * @param password undefined | string
   * @returns Promise<void>
   */
  public static EditAcount = async (
    userid: number,
    firstname?: string,
    lastname?: string,
    email?: string,
    phone?: string,
    colorDay?: GraphColors,
    colorNight?: GraphColors,
    password?: string
  ): Promise<void> => {
    let userExists = await UserAccount.findAndCountBy({ userId: userid });
    if (userExists[1] < 1 && userExists[1] > 1)
      throw new Error(
        `Acount does not exist or there is an Indexing fault. looking for acount: ${userid}`
      );

    if (firstname) await UserAccount.update(userid, { firstname: firstname })
    if (lastname) await UserAccount.update(userid, { lastname: lastname })
    if (email) await UserAccount.update(userid, { email: email })
    if (phone) await UserAccount.update(userid, { phone: phone })
    if (colorDay) await UserAccount.update(userid, { colorDay: colorDay })
    if (colorNight) await UserAccount.update(userid, { colorNight: colorNight })
    if (password) await UserAccount.update(userid, { password: password })
    // await UserAccount.update(userid, {
    //   firstname: firstname,
    //   lastname: lastname,
    //   email: email,
    //   phone: phone,
    //   colorDay: colorDay,
    //   colorNight: colorNight,
    // });
  };

  /**
   * couple an existing Device to an existing User
   * @param userId number user id
   * @param deviceid string unique id of device
   */
  public static AddDevicetoUser = async (
    userId: number,
    deviceid: string
  ): Promise<void> => {
    const user = await UserAccount.findOne({
      where: { userId: Equal(userId) },
    });
    const device = await Device.findOne({
      where: { deviceId: Equal(deviceid) },
    });
    if (!ObjectUtil.isSet(user) || !ObjectUtil.isSet(device)) return;

    await Device.update({ deviceId: deviceid }, { user: user });
  };

  /**
   * change alternate name for device
   * @param device_index number device index
   * @param alias string of 1 to 50 characters
   */
  public static ChangeDeviceAlias = async (
    device_index: number,
    alias: string
  ): Promise<void> => {
    let device: Device = await Device.findOne({
      where: {
        device_index: Equal(device_index),
      },
    });
    if (!ObjectUtil.isSet(device)) return;
    device.setFriendlyName(alias).save();
  };
  //#endregion

  //#region Delete Data

  /**
   * deletes a single administrator from database
   * @param userId number
   */
  public static DeleteAdministrator = async (
    userId: number
  ): Promise<DeleteResult> => {
    const admin = await Administrator.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          userId: userId,
        },
      },
    });

    if (admin.length === 1) {
      return await Administrator.delete({ adminId: admin[0].adminId });
    }
    return null;
  };

  /**
   * deletes a single user from the database using the userId
   * If user is an administrator then it removes the admin permissions first
   * @param userId number
   */
  public static DeleteUser = async (userId: number): Promise<boolean> => {
    return (await UserAccount.delete({ userId: userId })).affected >= 1;
  };

  // Fails if data is not removed first
  /**
   * deletes a single device from database. could fail still testing
   * @param deviceid string
   */
  public static DeleteDevice = async (
    deviceid: string
  ): Promise<DeleteResult> => await Device.delete({ deviceId: deviceid });

  /**
   * deletes a single data row
   * @param dataid number
   */
  public static DeleteData = async (dataid: number): Promise<DeleteResult> =>
    await Data.delete({ dataId: dataid });

  /**
   * deletes a single contact form.
   * @param id number
   */
  public static DeleteContactForm = async (id: number): Promise<DeleteResult> =>
    await ContactForm.delete({ contactId: id });

  /**
   * Returns all the data in the logfile
   */
  public static GetLogfileData = async (skip: number) => {
    let logs: Logfile[] = await Logfile.find({
      skip: skip,
      take: 10,
      relations: {
        account_id: true
      },
      order: {
        id: "DESC",
      },
    });
    // console.log(logs)
    let newLogs: ILogData[] = [];
    for (let log of logs) {
      let account_id: number | undefined = undefined;
      if (log.account_id !== null) {
        account_id = log.account_id.userId
      }
      newLogs.push({
        id: log.id,
        date: log.date,
        description: log.description,
        ipaddress: log.ipaddress,
        account_id: account_id
      })
    }
    const count = await Logfile.count()
    return { data:newLogs, pages: Math.ceil(count / 10)}
  };

  /**
   * This creates a logfile and adds it to the database if Logfile is complete
   * @param userId number user id
   * @param description string
   * @param ipaddress string
   */
  public static CreateLog = async (
    userId: number,
    description: string,
    ipaddress: string
  ): Promise<void> => {
    let user = await UserAccount.findOne({ where: { userId: Equal(userId) } });
    if (!ObjectUtil.isSet(user)) return;

    let newLog = Logfile.createLogFile(user, description, ipaddress);
    validate(newLog).then(async (result) => {
      if (result.length <= 0) await Logfile.save(newLog);
    });
  };

  /**
   * removes all password reset rows that are older than 30 minutes
   */
  public static DeleteExpiredPasswordResets = async () => {
    const expiringDate: Date = new Date(new Date().getTime() - 30 * 60 * 1000);
    await PasswordReset.delete({ created_at: LessThan(expiringDate) });
  };

  /**
   * deletes a single password reset token in database
   * @param token string
   */
  public static DeleteSpecificPasswordReset = async (
    token: string
  ): Promise<DeleteResult> => await PasswordReset.delete({ token: token });

  public static DeletePasswordResetForUser = async (user: UserAccount): Promise<DeleteResult> => await PasswordReset.delete({
    user: {
      userId: user.userId
    }
  });

  /**
   * Returning the device of the user.
   * @param userId number
   * @returns array with devices
  */
  public static UserDevices = async (userId: number): Promise<ITempData[]> => {
    const user: UserAccount = await UserAccount.findOneBy({ userId: userId })

    const devices: Device[] = await this.getDevices(user.userId);

    let tempData: ITempData[] = await devices.map((device: any) => {
      return {
        deviceIndex: device.device_index,
        deviceId: device.deviceId,
        friendlyName: device.friendlyName,
        batteryPercentage: device.BatteryPercentage
      }
    })
    return tempData;
  }
  //#endregion

  /* Creating a device and then adding it to a user. */
  public static RegisterAccountWithUser = async (
    dev_id: string,
    user_id: number,
  ) => {
    await Device.createDevice(dev_id);
    DataProcessor.AddDevicetoUser(user_id, dev_id);
  };

  public static SendDataFromDevice = async (dev_id : string , battery : number, image: string) => {
    const device: Device = await Device
      .findOne({ where: { deviceId: Equal(dev_id) } });
    if (!ObjectUtil.isSet(device)) return;
    device.setBatteryPercentage(battery).save();

    const user: UserAccount = await UserAccount
      .findOne({ where: { userId: Equal(device.user.userId) } });
    if (!ObjectUtil.isSet(user)) return;
  };


}

interface ITempData {
  deviceIndex: number;
  deviceId: string;
  friendlyName: string;
  batteryPercentage: number;
}