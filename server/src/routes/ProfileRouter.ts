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
    phone_number:string;
    password: string;
    password_verify: string;
};

type LoginData = Pick<CreationData, "email" | "password">;

router.post("/login", async (req: Request, res: Response) => {
    let body = req.body;
    const data: LoginData = {
        email: body.email,
        password: body.password
    }

    if(Object.values(data).every(InputUtil.isSet)) {

        if(await AccountManager.doesAccountExist(undefined, data.email)) {
           await SessionManager.createLoggedInSession(req, await AccountManager.getAccount(undefined, data.email));
        }
    }
});

router.post("/google-login", async (req: Request, res: Response) => {
    const { google_token } = req.body;

    if (google_token) {
        await GoogleAuth.verifyTokenAct(google_token, async (payload) => {

            // If they don't have an account, create one
            if (!(await AccountManager.doesAccountExist(undefined, payload.email)))
                await AccountManager.createAccount(payload.given_name, payload.family_name, payload.email, Crypt.createRandomPassword(24), "");


        });
    }
});


router.post("/logout", async (req: Request, res: Response) => {
    SessionManager.destroy(req, res);
});

router.post("/create-profile", async (req: Request, res: Response) => {
    let body = req.body;

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
        const hashedPassword = Crypt.encrypt(data.password);

        // Validate entries
        if (!RegExpVal.validate(data.email, RegExpVal.emailValidator) || !RegExpVal.validate(data.phone_number, RegExpVal.phoneValidator)) {
            res.status(500).json(errorJson("Wrong Syntax for email or phone", body));
            return;
        }

        if (await AccountManager.doesAccountExist(0, data.email)) {
            res.json(errorJson("Account already exists", body));
            return;
        }

        if (data.password.length < 8) {
            res.json(errorJson("Password too short", body));
            return;
        }

        if (data.password !== data.password_verify) {
            res.json(errorJson("Passwords don't match", body));
            return;
        }

        if (await AccountManager.createAccount(data.first_name, data.last_name, data.email, hashedPassword, data.phone_number) > 0) {
            res.json({ succes: true });
            return;
        }

        res.status(500).json(errorJson("Something went wrong.", body));
        return;
    }

    res.json(errorJson(
        "Missing fields",
        body,
        Object.entries(data).filter((entry) => !InputUtil.isSet(entry[1])).map((entry) => entry[0]))
    );
});

router.delete("/delete-profile", async (req: Request, res: Response) => {
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