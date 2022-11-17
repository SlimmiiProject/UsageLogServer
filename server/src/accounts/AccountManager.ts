
import { DataProcessor } from "../data/DataProcessing";
import { UserAccount } from "../data/entities/UserAccount";
import { ObjectUtil } from "../utils/ObjectUtil";

export class AccountManager {

    public static async createAccount(firstName: string, lastName: string, email: string, raw_password: string, phoneNumber?: string): Promise<number> {
        return await DataProcessor.CreateUser(firstName, lastName, email, raw_password, phoneNumber);
    }

    public static async removeAccount(email: string) {
        const user = (await DataProcessor.GetUser(email));
        return user && await DataProcessor.DeleteUser(user.userId);
    }

    public static async doesAccountExist(userId?: number, email?: string): Promise<boolean> {
        return ObjectUtil.isSet(await DataProcessor.GetUser(email, userId));
    }

    public static async getAccount(userId?: number, email?: string): Promise<UserAccount> {
        return await DataProcessor.GetUser(email, userId);
    }

    public static async isAdministrator(userId: number): Promise<boolean> {
        return ObjectUtil.isSet(await DataProcessor.GetAdministrator(userId));
    }

    public static async getEncryptedPassword(userId?: number, email?: string): Promise<string> {
        return (await this.getAccount(userId, email)).password;
    }
}
