
import { DataProcessor } from "../data/DataProcessing";
import { Crypt } from "../utils/Crypt";

export class AccountManager {

    public static async createAccount(firstName: string, lastName: string, email: string, raw_password: string | undefined, phoneNumber?: string): Promise<number> {
        return await DataProcessor.CreateUser(firstName, lastName, email, Crypt.encrypt(raw_password), phoneNumber);
    }

    public static async removeAccount(email: string) {
        const user = (await DataProcessor.GetUser(email));
        if (user) await DataProcessor.DeleteUser(user.userId);
    }

    public static async doesAccountExist(userId?: number, email?: string): Promise<boolean> {
        return await DataProcessor.GetUser(email) !== undefined;
    }

}