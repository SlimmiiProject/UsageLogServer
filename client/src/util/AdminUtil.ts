import axios, { AxiosInstance } from "axios";

export enum GraphColors {
    RED = "red",
    GREEN = "green",
    ORANGE = "orange",
    YELLOW = "yellow",
    BLUE = "blue",
    PURPLE = "purple"
}
export type LogData = {
    id: number;
    date: Date;
    description: string;
    ipaddress: string;
    account_id?: number;
}
export type userData = {
    userId: number;
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    device: number[];
    colorDay: GraphColors;
    colorNight: GraphColors;
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
            console.log(res.data[0].date.toString())
            //doesn't work?
            //console.log(res.data[0].date.toDateString())
            return res.data;
        } catch (_ignored) {
            return [];
        }
    }
    public static getUsers = async (controller: AbortController): Promise<userData[]> => {
        try {
            const res = await this.INSTANCE.get("/admin/allusers/", { signal: controller.signal });
            return res.data;
        } catch (_ignored) {
            return [];
        }
    }

}