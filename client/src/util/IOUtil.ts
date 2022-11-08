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

    public static async loginUser(email: string, password: string) {
        let res;
        res = await this.INSTANCE.post("/profiles/login", {
            email: email,
            password: password
        });

        return res.status === 200 ? true : false
    }

    public static async registerUser(first_name: string, last_name: string, email: string, phone_number: string, password: string, password_verify: string) {
        await this.INSTANCE.post("/profiles/create-profile/", {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number,
            password: password,
            password_verify: password_verify
        });
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