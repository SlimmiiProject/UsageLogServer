import { DataProcessor } from "../data/DataProcessing";

export class AccountManager {

    public static async createAccount(firstName: string, lastName: string, email: string, hashed_password: string | undefined, phoneNumber: string): Promise<number> {
        if (await this.doesAccountExist(-1, email, phoneNumber)) return -1;

        return await DataProcessor.CreateUser(firstName, lastName, email, hashed_password, phoneNumber);
    }

    public static async removeAccount(email: string) {
        const user = (await DataProcessor.GetUser(undefined, email));
        if (user) await DataProcessor.DeleteUser(user.userId);
    }

    public static async doesAccountExist(userId?:number, email?: string, telephoneNumber?: string): Promise<boolean> {
        return await DataProcessor.GetUser(userId, email, telephoneNumber) !== null;
    }


}