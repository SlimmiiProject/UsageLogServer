import { OAuth2Client, TokenPayload } from 'google-auth-library';

export class GoogleAuth {

    private static readonly CLIENT_ID = "221342809801-g72s252qo6fqssr1taughcq32er2o6dh.apps.googleusercontent.com";
    private static _client = new OAuth2Client(this.CLIENT_ID);

    public static async verifyToken(token: string): Promise<boolean> {
        return this.verifyTokenAct(token);
    }

    public static async verifyTokenAct(token: string, callback?: { (payload: TokenPayload): Promise<void> }): Promise<boolean> {
        try {
            const ticket = await this._client.verifyIdToken({
                idToken: token,
                audience: this.CLIENT_ID
            });

            if (callback)
                await callback(ticket.getPayload());

            return true;
        } catch (_ignored) { }

        return false;
    }
}