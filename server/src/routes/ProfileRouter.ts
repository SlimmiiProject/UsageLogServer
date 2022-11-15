import { RegExpVal } from './../utils/RegexValidator';
import { AccountManager } from './../accounts/AccountManager';
import { InputUtil } from './../utils/InputUtil';
import express, { Request, Response } from "express";
import { Crypt } from '../utils/Crypt';
import { GoogleAuth } from '../utils/GoogleAuth';
import { SessionManager } from '../accounts/SessionManager';
const router = express.Router();

type CreationData = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    password_verify: string;
};

type LoginData = Pick<CreationData, "email" | "password">;

router.post("/login", async (req: Request, res: Response) => {
    const body = req.body;
    const data: LoginData = {
        email: body.email,
        password: body.password
    }

    if (Object.values(data).every(InputUtil.isSet)) {

        if (await AccountManager.doesAccountExist(undefined, data.email)) {
            if (Crypt.matchesEncrypted(data.password, await AccountManager.getEncryptedPassword(undefined, data.email))) {
                await login(req, data.email)
                return res.json({ succes: true });
            }
        };
    }

    res.json({ succes: false })
});

router.post("/google-login", async (req: Request, res: Response) => {
    const { google_token } = req.body;

    if (google_token) {
        await GoogleAuth.verifyTokenAct(google_token, async (payload) => {

            // If they don't have an account, create one
            if (!(await AccountManager.doesAccountExist(undefined, payload.email)))
                await AccountManager.createAccount(payload.given_name, payload.family_name, payload.email, Crypt.createRandomPassword(24), "");

            await login(req, payload.email);
            res.json({ succes: true });
            return;
        });
    }

    res.json({ succes: false });
});

const login = async (req: Request, email: string) => {
    await SessionManager.createLoggedInSession(req, await AccountManager.getAccount(undefined, email));
}

router.post("/logout", SessionManager.loginRequired, async (req: Request, res: Response) => {
    SessionManager.destroy(req, res);
    res.json({ succes: true })
});

router.post("/create-profile", async (req: Request, res: Response) => {
    const body = req.body;

    const data: CreationData = {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone_number: body.phone_number,
        password: body.password,
        password_verify: body.password
    }

    /* Checking if all the values in the data object are set. */
    if (Object.values(data).every(InputUtil.isSet)) {

        // Validate entries
        if (data.first_name.length < 3 && data.last_name.length < 3) return res.json(errorJson("Name needs to be minimum of 3 letters"));
        if (!RegExpVal.validate(data.email, RegExpVal.emailValidator) || !RegExpVal.validate(data.phone_number, RegExpVal.phoneValidator)) return res.json(errorJson("Wrong Syntax for email or phone", body));
        if (await AccountManager.doesAccountExist(0, data.email)) return res.json(errorJson("Account already exists", body));
        if (data.password.length < 8) return res.json(errorJson("Password too short", body));
        if (data.password !== data.password_verify) return res.json(errorJson("Passwords don't match", body));
        if (await AccountManager.createAccount(data.first_name, data.last_name, data.email, data.password, data.phone_number) > 0) return res.json({ succes: true });

        res.json(errorJson("Something went wrong.", body));
        return;
    }

    res.json(errorJson(
        "Missing fields",
        body,
        Object.entries(data).filter((entry) => !InputUtil.isSet(entry[1])).map((entry) => entry[0]))
    );
});

router.delete("/delete-profile", SessionManager.loginRequired, async (req: Request, res: Response) => {
    // Delete account
});

const errorJson = (errorType: string, fields?: { [key: string]: string }, missingFields?: string[]): {} => {
    const errorJson: any = {};

    if (fields) errorJson["fields"] = { ...fields, password: undefined, password_verify: undefined };
    if (missingFields) errorJson["missing_fields"] = missingFields;

    return {
        succes: false,
        error: errorType,
        ...errorJson
    }
}

module.exports = router;
