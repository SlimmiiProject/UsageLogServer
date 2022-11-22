
import { DataProcessor } from "../data/DataProcessing";
import { UserAccount } from "../data/entities/UserAccount";
import { ObjectUtil } from "../utils/ObjectUtil";

export class AccountManager {

    public static createAccount = async (firstName: string, lastName: string, email: string, raw_password: string, phoneNumber?: string): Promise<number> =>
        await DataProcessor.createUser(firstName, lastName, email, raw_password, phoneNumber);

    public static removeAccount = async (email: string) => {
        const user = (await DataProcessor.getUser(email));
        return user && await DataProcessor.DeleteUser(user.userId);
    }

    public static doesAccountExist = async (userId?: number, email?: string): Promise<boolean> => ObjectUtil.isSet(await DataProcessor.getUser(email, userId));

    public static getAccount = async (userId?: number, email?: string): Promise<UserAccount> => await DataProcessor.getUser(email, userId);

    public static isAdministrator = async (userId: number): Promise<boolean> => ObjectUtil.isSet(await DataProcessor.getAdministrator(userId));

    public static getEncryptedPassword = async (userId?: number, email?: string): Promise<string> => (await this.getAccount(userId, email)).password;
}
