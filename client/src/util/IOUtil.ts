import axios, { AxiosInstance } from "axios";
import { ContactInfo } from "../components/Contact";

export type Error = {
  succes: boolean;
  error: string;
  missing_fields?: string[];
}
export type DataCallback = {
  (error: Error): void;
};

export class IOUtil {

  private static _instance: AxiosInstance;
  private static get INSTANCE(): AxiosInstance {
    if (!this._instance) this._instance = axios.create({ baseURL: "/api/", timeout: 5000 });
    return this._instance;
  }

  public static async getTranslationConfig() {
    const conn = await this.INSTANCE.get("/translation/");
    return conn.data;
  }

  public static async registerUser(
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    password: string,
    password_verify: string,
    callback: DataCallback
  ) {
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

  public static async loginUser(email: string, password: string) {
    try {
      let res = await this.INSTANCE.post("/profiles/login", {
        email: email,
        password: password,
      });

      return res.data.succes;
    } catch (e) {
      return false;
    }
  }

  public static async loginGoogle(token: string) {
    try {
      const res = await this.INSTANCE.post("/profiles/google-login/", { google_token: token });
      return res.data.succes;
    } catch (_ignored) {
      return false;
    }
  }

  public static async logoutUser() {
    try {
      const res = await this.INSTANCE.post("/profiles/logout/");
      return res.data.succes;
    } catch (err) {
      return false;
    }
  }

  public static async sendContactData(data: ContactInfo) {
    await this.INSTANCE.post("/contact/", data);
  }
}