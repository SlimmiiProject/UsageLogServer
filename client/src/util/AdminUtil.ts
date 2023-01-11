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
    phone: string;
    isAdmin: boolean;
}

export type userResponseData = {
    data: userData[]
    pages: number
}

export type deviceResponseData = {
    data: deviceData[]
    pages: number
}

export type logResponseData = {
    data: LogData[]
    pages: number
}

export type deviceData = {
    index: number;
    id: string;
    alias: string | undefined;
    owner: number | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
}

export class AdminUtil {
    public static getLogs = async (controller: AbortController, page: number): Promise<logResponseData> => {
        const toSkip = page * 10;
        try {
            const res = await IOUtil.INSTANCE.get("/admin/logfile/", { params: { skip: toSkip }, signal: controller.signal });
            return res.data;
        } catch (_ignored) {
            return { data: [], pages: 0 };
        }
    }

    public static getUser = async (userId: number): Promise<userData> => {
        try {
            const res = await IOUtil.INSTANCE.get(`/admin/user`, { params: { userId: userId } });
            return res.data;
        } catch (_ignore) {
            return {
                userId: 0,
                firstname: "",
                lastname: "",
                email: "",
                device: [],
                phone: "",
                isAdmin: false
            }
        }
    }

    /* A function that is called when a user is created. */
    public static getUsers = async (controller: AbortController, page: number, howManyPerPage? : number): Promise<userResponseData> => {
        const toSkip = page * howManyPerPage!;
        try {
            const res = await IOUtil.INSTANCE.get("/admin/allusers/", { params: { skip: toSkip, limit: howManyPerPage}, signal: controller.signal });
            return res.data;
        } catch (err) {
            console.error(err);
            return { data: [], pages: 0 };
        }
    }

    public static getAllUsers = async (controller: AbortController): Promise<userResponseData> => {
        try {
            const res = await IOUtil.INSTANCE.get("/admin/allusers", { signal: controller.signal });
            return res.data;
        } catch (err) {
            console.error(err);
            return { data: [], pages: 0 };
        }
    }

    public static getAllDevices = async (controller: AbortController, page: number) => {

        const toSkip = page * 10;
        try {
            const res = await IOUtil.INSTANCE.get("admin/allDevices", { params: { skip: toSkip }, signal: controller.signal });
            return res.data;
        } catch (_ignored) {
            return { data: [], pages: 0 };
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
            const res = await IOUtil.INSTANCE.delete("admin/account", { data: { userId: userId } });
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