import axios, { AxiosInstance } from "axios";
import { ContactInfo } from "../components/Contact";

export class IOUtil {

    private static _instance: AxiosInstance;
    private static get INSTANCE(): AxiosInstance {
        if (!this._instance) this._instance = axios.create({
            baseURL: "/api/",
            timeout: 3000
        });;

        return this._instance;
    }

    public static async getTranslationConfig() {
        const conn = await this.INSTANCE.get("/translation/");
        return conn.data;
    }

    public static async logoutUser() {
        await this.INSTANCE.post("/profiles/logout/");
    }

    public static async loginGoogle(token: string) {
        await this.INSTANCE.post("/profiles/google-login/", {
            google_token: token
        });
    }

    public static async sendContactData(data: ContactInfo) {
        await this.INSTANCE.post("/contact/", data)
    }
}