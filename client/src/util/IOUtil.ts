import axios, { AxiosInstance } from "axios";

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

}