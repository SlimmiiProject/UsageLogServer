import { DataProcessor } from "../DataProcessing";
import { PasswordReset } from "../entities/PasswordReset";

export class PasswordResetManager {

    private _token: string;
<<<<<<< HEAD
    private _newPassword:string;
    private _resetEntry: PasswordReset;

    constructor(token: string, new_password:string) {
=======
    private _newPassword: string;
    private _resetEntry: PasswordReset;

    constructor(token: string, new_password: string) {
>>>>>>> 4b9125ca1a0144516b6e3a07bd2e242acad5b55d
        this._token = token;
        this._newPassword = new_password;
    }

    private setup = async () => {
        this._resetEntry = await DataProcessor.GetPasswordReset(this._token);
    }

    private get isValid() {
        return (Date.now() - this._resetEntry.created_at.getMilliseconds()) > (30 * 60 * 1000); // 30 Minutes
    }

<<<<<<< HEAD
    public handle = async ():Promise<boolean> => {
        await this.setup();

        if(!this._resetEntry) return false;
=======
    public handle = async (): Promise<boolean> => {
        await this.setup();

        if (!this._resetEntry || this._newPassword === "") return false;
>>>>>>> 4b9125ca1a0144516b6e3a07bd2e242acad5b55d

        if (this.isValid) {
            await DataProcessor.ChangePassword(this._resetEntry.user.userId, this._newPassword);
        }

        await DataProcessor.DeleteSpecificPasswordReset(this._token);
        return true;
    }
}