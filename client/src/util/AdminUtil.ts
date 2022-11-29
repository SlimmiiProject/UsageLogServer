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
    email: string;
    device: number[];
    colorDay: GraphColors;
    colorNight: GraphColors;
    isAdmin: boolean;
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

    /* A function that is called when a user is created. */
    public static getUsers = async (controller: AbortController): Promise<userData[]> => {
        console.log("received allusers request");
         try {
             const res = await this.INSTANCE.get("/admin/allusers/", { signal: controller.signal });
             return res.data;
         } catch (_ignored) {
             return [];
         }
    }

    public static getAllDevices = async () => {
        try {
            const res = await this.INSTANCE.get("admin/getAllDevices");
            return res.data;
        } catch (_ignored) {
            return [];
        }
    }

    /* A function that is called when a user is created. */
    public static createAdmin = async (userId: number) => {
        try {
            const res = await this.INSTANCE.post("admin/create-admin", {userId: userId});
            return res.data;
        } catch (err) {
            console.error(err)
        }
    }

}