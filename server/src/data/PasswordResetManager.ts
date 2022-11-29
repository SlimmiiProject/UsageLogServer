import { DataProcessor } from "./DataProcessing";
import { PasswordReset } from "./entities/PasswordReset";

export class PasswordResetManager {

    private _token: string;
    private _resetEntry:PasswordReset;

    constructor(token:string) {
        this._token = token;
    }

    private setup = async () => {
        this._resetEntry = await DataProcessor.GetPasswordReset(this._token);
    }

    private isValid = () => {

    }

    public handle = async () => {
        await this.setup();
    }
}