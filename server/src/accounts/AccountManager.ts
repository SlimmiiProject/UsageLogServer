import { DataProcessor } from "../data/DataProcessing";

export class AccountManager {

    public static async createAccount(firstName: string, lastName: string, email: string, password: string | undefined, phoneNumber: string) {
        if(await this.doesAccountExist(email, phoneNumber)) return;

        await DataProcessor.CreateUser(firstName, lastName, email, password, phoneNumber);
    }

    public static async removeAccount(email: string) {
        const user = (await DataProcessor.GetUser(undefined, email));
        if (user) await DataProcessor.DeleteUser(user.userId);
    }

    public static async doesAccountExist(email?: string, telephoneNumber?: string): Promise<boolean> {
        return await DataProcessor.GetUser(undefined, email, telephoneNumber) !== undefined;
    }
}