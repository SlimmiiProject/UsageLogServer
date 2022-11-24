import axios, { AxiosInstance } from "axios";

export type LogData = {
    id: number;
    date: Date;
    description: string;
    ipaddress: string;
    account_id?:number;
}

export class AdminUtil {

    private static _instance: AxiosInstance;
    private static get INSTANCE(): AxiosInstance {
        if (!this._instance) this._instance = axios.create({ baseURL: "/api/", timeout: 5000 });
        return this._instance;
    }

    public static getLogs = async (controller: AbortController): Promise<LogData[]> => {
        try {
            const res = await this.INSTANCE.get("/admin/logfile/", { signal: controller.signal });
            return res.data;
        } catch (_ignored) {
            return [];
        }
    }
}