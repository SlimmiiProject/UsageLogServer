import { deviceData } from './AdminUtil';
/**
 * IOUtil is a class with a static method deleteUserFromDevice that takes a string and returns void.
 * @property {boolean} succes - boolean;
 * @property {string} error - string;
 * @property {string[]} missing_fields - string[]
 */
import axios, { AxiosInstance } from "axios";
import { AccountData, IDevice } from "../App";
import { ContactInfo } from "../components/Contact";

export type Error = {
  succes: boolean;
  error: string;
  missing_fields?: string[];
}
export type DataCallback = {
  (error: Error): void;
};

export type Period = "Day" | "Week" | "Month";

/*
implement this
user needs to be deleted from device when pressed on a button
*/
export class IOUtil {
  static deleteUserFromDevice(id: string): void {
    throw new Error("Method not implemented.");
  }

  private static _instance: AxiosInstance;
  public static get INSTANCE(): AxiosInstance {
    if (!this._instance) this._instance = axios.create({ baseURL: "/api/", timeout: 5000 });
    return this._instance;
  }

  public static getTranslationConfig = async () => {
    const conn = await this.INSTANCE.get("/translation/");
    return conn.data;
  }

  public static registerUser = async (
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    password: string,
    password_verify: string,
    callback: DataCallback
  ) => {
    try {
      const res = await this.INSTANCE.post("/profiles/create-profile/", {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
        password: password,
        password_verify: password_verify,
      });

      if (res.data.error && res.data.error.length > 0)
        callback(res.data);

      return res.data.succes;
    } catch (_ignored) {
      callback({ succes: false, error: "Something went wrong!" });
      return false;
    }
  }

  public static loginUser = async (email: string, password: string, dataConsumer: { (data: AccountData): void }) => {
    try {
      let res = await this.INSTANCE.post("/profiles/login", {
        email: email,
        password: password,
      });

      dataConsumer(res.data.user);

      return res.data.succes;
    } catch (e) {
      return undefined;
    }
  }

  public static loginGoogle = async (token: string) => {
    try {
      const res = await this.INSTANCE.post("/profiles/google-login/", { google_token: token });
      return res.data.succes;
    } catch (_ignored) {
      return false;
    }
  }

  public static logoutUser = async () => {
    try {
      const res = await this.INSTANCE.post("/profiles/logout/");
      return res.data.succes;
    } catch (err) {
      return false;
    }
  }

  public static getSessionData = async (controller: AbortController): Promise<AccountData | undefined> => {
    try {
      const res = await this.INSTANCE.get("/session/", { signal: controller.signal });
      return !res.data.error ? res.data.user : undefined;
    } catch (err) {
      return undefined;
    }
  }

  public static isAdmin = async (controller?: AbortController): Promise<boolean> => {
    try {
      const res = await this.INSTANCE.get("/session/admin-check", { signal: controller?.signal });
      return !res.data.error ? res.data.isAdmin : false;
    } catch (err) {
      return false;
    }
  }

  public static getDevicesData = async (period: Period, controller: AbortController): Promise<IDevice[]> => {
    try {
      const res = await this.INSTANCE.get(`/data/data?period=${period}`, { signal: controller.signal });
      return res.data;
    } catch (error) {
      return [];
    }
  }

  public static sendContactData = async (data: ContactInfo) => await this.INSTANCE.post("/contact/", data);

  public static deleteUser = async (userId: number) => {
    try {
      const res = await this.INSTANCE.delete(`/users/${userId}/user`);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  /**It deletes a device from the database. 
   * @param deviceId string
  */
  public static deleteDevice = async (deviceId: string) => {
    try {
      const res = await this.INSTANCE.delete(`/admin/device`, { data: { deviceId: deviceId } });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  /** It adds a device to the database. 
   * @param deviceId string
   * @param alias string
  */
  public static addDevice = async (deviceId: string, alias: string) => {
    try {
      const res = await this.INSTANCE.post("/admin/device", { deviceId: deviceId, alias: alias });
      return res.data;
    } catch (err) {
      console.error(err)
    }
  }

  public static requestPasswordReset = async (email: string) => {
    try {
      const res = await this.INSTANCE.post("/profiles/submit-forgot-password", { email: email });
      return res.status === 200;
    } catch (err) {
      return false;
    }
  }

  /** A function that gets the device of the user. 
   * @param userId number
   * @returns devicedata for the specific user
  */
  public static getOwnDevice = async (userId: number) => {
    try {
      const res = await this.INSTANCE.get(`/users/${userId}/device`);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  public static changePassword = async (token: string, password: string) => {
    try {
      const res = await this.INSTANCE.put(`/profiles/password`, { token: token, password: password });
      return res.status === 200;
    } catch (err) {
      return false;
    }
  }

  public static doesPasswordResetExist = async (token: string, controller: AbortController) => {
    try {
      const res = await this.INSTANCE.get(`/profiles/password`, {
        signal: controller.signal,
        params: {
          token: token
        }
      });
      return res.status === 200;
    } catch (err) {
      return false;
    }
  }

  public static doesPasswordResetExist = async (token: string, controller: AbortController) => {
    try {
      const res = await this.INSTANCE.get(`/profiles/password`, {
        signal: controller.signal,
        data: {
          token: token
        }
      });
      return res.status === 200;
    } catch (err) {
      return false;
    }
  }

  public static isAborted = (abortController: AbortController) => abortController.signal.aborted;
}