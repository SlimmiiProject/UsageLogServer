import { IOUtil } from './IOUtil';

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
    account_id?: number | null;
}
export type userData = {
    userId: number;
    firstname: string;
    lastname: string;
    email: string;
    device: number[];
    colorDay: GraphColors;
    colorNight: GraphColors;
    phone: string;
    isAdmin: boolean;
}
export type deviceData = {
    index: number;
    id: string;
    alias: string | undefined;
    owner: number | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
}

export type TranslationData = {
    //TODO idk what to do with this.
    language: string,
    word: string
}
export class AdminUtil {
   public static getLogs = async (controller: AbortController): Promise<LogData[]> => {
        try {
            const res = await IOUtil.INSTANCE.get("/admin/logfile/", { signal: controller.signal });
            return res.data;
        } catch (_ignored) {
            return [];
        }
    }

    /* A function that is called when a user is created. */
    public static getUsers = async (controller: AbortController, page:number): Promise<userData[]> => {
        const toSkip = page * 20;
        console.log("received allusers request");
        try {
            const res = await IOUtil.INSTANCE.get("/admin/allusers/", { params: {skip: toSkip}, signal: controller.signal });
            return res.data;
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    public static getAllDevices = async (controller: AbortController) => {
        try {
            const res = await IOUtil.INSTANCE.get("admin/allDevices");
            console.log(res.data)
            return res.data;
        } catch (_ignored) {
            return [];
        }
    }

    /* A function that is called when a user is created. */
    public static createAdmin = async (userId: number) => {
        try {
            const res = await IOUtil.INSTANCE.post("admin/account", { userId: userId });
            return res.data;
        } catch (_ignore) {
            return
        }
    }
    public static deleteAdmin = async (userId: number) => {
        try {
            const res = await IOUtil.INSTANCE.delete("admin/account", { data :{ userId: userId} });
            return res.data;
        } catch (err) {
            console.error(err)
        }
    }

    public static addDeviceToUser = async (userId: number, deviceId: string) => {
        try {
            const res = await IOUtil.INSTANCE.put("/admin/add-device-user", { userId: userId, deviceId: deviceId });
            return res.data;
        } catch (err) {
            console.error(err)
        }
    }

}