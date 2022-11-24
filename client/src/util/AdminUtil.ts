import axios, { AxiosInstance } from "axios";
import { AccountData, IDevice } from "../App";

export type Error = {
    succes: boolean;
    error: string;
    missing_fields?: string[];
}
export type DataCallback = {
    (error: Error): void;
};

export class AdminUtil {

    private static _instance: AxiosInstance;
    private static get INSTANCE(): AxiosInstance {
        if (!this._instance) this._instance = axios.create({ baseURL: "/api/", timeout: 5000 });
        return this._instance;
    }
    public static getLogs = async () => {
        try {
            const res = await this.INSTANCE.get("/admin/logfiles/");
            return res.data.success;
        } catch (_ignored) {
            return false;
        }
    }



}