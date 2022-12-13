import { DataProcessor } from "../DataProcessing";
import { PasswordReset } from "../entities/PasswordReset";

export class PasswordResetManager {

    private _token: string;
    private _newPassword: string;
    private _resetEntry: PasswordReset;

    constructor(token: string, new_password: string) {
        this._token = token;
        this._newPassword = new_password;
    }

    private setup = async () => {
        this._resetEntry = await DataProcessor.GetPasswordReset(this._token);
    }

    private get isValid() {
        return (Date.now() - this._resetEntry.created_at.getMilliseconds()) > (30 * 60 * 1000); // 30 Minutes
    }

    public handle = async (): Promise<boolean> => {
        await this.setup();

        if (!this._resetEntry || this._newPassword === "") return false;

        if (this.isValid)
            await DataProcessor.ChangePassword(this._resetEntry.user.userId, this._newPassword);


        await DataProcessor.DeleteSpecificPasswordReset(this._token);
        return true;
    }
}