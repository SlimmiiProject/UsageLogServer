import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { Environment } from './Environment';

export class GoogleAuth {

    private static readonly CLIENT_ID = Environment.CONFIG.google.client_id;
    private static _client = new OAuth2Client(this.CLIENT_ID);

    public static verifyToken = async (token: string): Promise<boolean> => {
        return this.verifyTokenAct(token);
    }

    /**
     * This function verifies the token and returns true if it's valid, otherwise it returns false.
     * @param {string} token - The token to verify.
     * @param [callback] - This is a function that will be called if the token is valid. It will be
     * passed the payload of the token.
     * @returns The token payload.
     */
    public static verifyTokenAct = async (token: string, callback?: { (payload: TokenPayload): Promise<void> }): Promise<boolean> => {
        try {
            const ticket = await this._client.verifyIdToken({ idToken: token, audience: this.CLIENT_ID });
            if (callback) await callback(ticket.getPayload());
            return true;
        } catch (_ignored) {
            return false;
        }
    }
}