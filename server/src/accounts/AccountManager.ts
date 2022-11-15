
import { DataProcessor } from "../data/DataProcessing";
import { UserAccount } from "../data/entities/UserAccount";
import { Crypt } from "../utils/Crypt";

export class AccountManager {

    public static async createAccount(firstName: string, lastName: string, email: string, raw_password: string, phoneNumber?: string): Promise<number> {
        return await DataProcessor.CreateUser(firstName, lastName, email, raw_password, phoneNumber);
    }

    public static async removeAccount(email: string) {
        const user = (await DataProcessor.GetUser(email));
        if (user) await DataProcessor.DeleteUser(user.userId);
    }

    public static async doesAccountExist(userId?: number, email?: string): Promise<boolean> {
        return await DataProcessor.GetUser(email, userId) !== undefined;
    }

    public static async getAccount(userId?: number, email?: string): Promise<UserAccount> {
        return await DataProcessor.GetUser(email, userId);
    }

    public static async isAdministrator(userId:number): Promise<boolean> {
        return await DataProcessor.GetAdministrator(userId) !== null;
    }

    public static async getEncryptedPassword(userId?: number, email?: string): Promise<string> {
        return (await this.getAccount(userId, email)).password;
    }
}
