import { DataProcessor } from './../data/DataProcessing';
import { RegExpVal } from './../utils/RegexValidator';
import { AccountManager } from './../accounts/AccountManager';
import express, { Request, Response } from "express";
import { Crypt } from '../utils/Crypt';
import { GoogleAuth } from '../utils/GoogleAuth';
import { SessionManager } from '../accounts/SessionManager';
import { ObjectUtil } from '../utils/ObjectUtil';
import { Mailer } from '../utils/mail/Mailer';
import { MailTemplates } from '../utils/mail/MailTemplates';
import { Environment } from '../utils/Environment';
import { PasswordResetManager } from '../data/processors/PasswordResetProcessor';

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

type ResetData = Pick<CreationData, "email">;

router.post("/login", async (req: Request, res: Response) => {
    const body = req.body;
    const data: LoginData = {
        email: body.email,
        password: body.password
    }

    const requiresPlainText = req.headers["accept"] === "text/plain";

    if (Object.values(data).every(ObjectUtil.isSet)) {

        if (await AccountManager.doesAccountExist(undefined, data.email)) {
            if (Crypt.matchesEncrypted(data.password, await AccountManager.getEncryptedPassword(undefined, data.email))) {
                await login(req, data.email)
                return !requiresPlainText ? res.json({ succes: true, ...SessionManager.getSessionData(req), sessionToken: req.sessionID}) : res.send(req.sessionID);
            }
        };
    }

    res.json({ succes: false })
});

router.post("/google-login", async (req: Request, res: Response) => {
    const { google_token } = req.body;


    if (google_token) {
        return await GoogleAuth.verifyTokenAct(google_token, async (payload) => {

            // If they don't have an account, create one
            if (!(await AccountManager.doesAccountExist(undefined, payload.email)))
                await AccountManager.createAccount(payload.given_name, payload.family_name, payload.email, Crypt.createRandomPassword(24), "");

            await login(req, payload.email);
            res.json({ succes: true, ...SessionManager.getSessionData(req) });
        });
    }

    res.json({ succes: false });
});

const login = async (req: Request, email: string) => await SessionManager.createLoggedInSession(req, await AccountManager.getAccount(undefined, email));

router.post("/logout", SessionManager.loginRequired, async (req: Request, res: Response) => SessionManager.destroy(req, res));

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
    if (Object.values(data).every(ObjectUtil.isSet)) {

        // Validate entries
        if (data.first_name.length < 3 && data.last_name.length < 3) return res.json(errorJson("error.name_minimum_three"));
        if (!RegExpVal.validate(data.email, RegExpVal.emailValidator) || !RegExpVal.validate(data.phone_number, RegExpVal.phoneValidator)) return res.json(errorJson("error.wrong_e_p_syntax", body));
        if (await AccountManager.doesAccountExist(0, data.email)) return res.json(errorJson("error.account_already_exists", body));
        if (data.password.length < 8) return res.json(errorJson("error.password_short", body));
        if (data.password !== data.password_verify) return res.json(errorJson("error.passwords_no_match", body));
        if (await AccountManager.createAccount(data.first_name, data.last_name, data.email, data.password, data.phone_number) > 0) return res.json({ succes: true });

        res.json(errorJson("error.undefined_error.", body));
        return;
    }

    res.json(errorJson(
        "error.missing_fields",
        body,
        Object.entries(data).filter((entry) => !ObjectUtil.isSet(entry[1])).map((entry) => entry[0]))
    );
});

router.route("/password")
    .put(async (req: Request, res: Response) => {
        const { token, password } = req.body;
        const passwordResetProcessor = new PasswordResetManager(token, password);
        res.sendStatus(await passwordResetProcessor.handle() ? 200 : 403);
    }).get(async (req: Request, res: Response) => {
        res.sendStatus(await DataProcessor.GetPasswordReset(req.query.token as string) ? 200 : 403);
    });

router.post("/submit-forgot-password", async (req: Request, res: Response) => {
    const data: ResetData = req.body;
    const userAccount = await AccountManager.getAccount(undefined, data.email);

    if (ObjectUtil.isSet(userAccount)) {
        await DataProcessor.DeletePasswordResetForUser(userAccount);
        const token = await DataProcessor.createPasswordReset(Crypt.createUrlSafeHash(41), userAccount);

        const { url, server_port } = Environment.CONFIG;
        // Send email
        Mailer.INSTANCE.sendMailTo(data.email, "Password Reset", MailTemplates.FORGOT_PASSWORD({
            resetUrl: `${url}:${server_port}/forgot-password?token=${token}`
        }));
    }

    res.sendStatus(200);
});

router.use(SessionManager.loginRequired);

router.delete("/delete-profile", SessionManager.loginRequired, async (req: Request, res: Response) => {
    // Delete account
});

router.route("/account-data")
    .get(async (req: Request, res: Response) => {
        const sessionData = SessionManager.getSessionData(req);

        res.json(await DataProcessor.getUser(undefined, sessionData.user.id));
    })
    .post(SessionManager.loginRequired, async (req: Request, res: Response) => {
        const data: CreationData = req.body;

        if (data.first_name && data.last_name && data.email) {
            const userId = SessionManager.getSessionData(req).user.id;
            const account = await DataProcessor.getUser(undefined, userId);

            account.email = data.email;
            account.firstname = data.first_name;
            account.lastname = data.last_name;
            account.phone = data.phone_number;

            if (data.password && data.password_verify)
                if (data.password === data.password_verify) account.setPassword(data.password);
                else return res.json(errorJson("error.passwords_no_match", req.body));

            await account.save();
            await SessionManager.updateSessionData(req, async (data) => {
                data.user = {
                    id: account.userId,
                    firstName: account.firstname,
                    lastName: account.lastname,
                    email: account.email,
                };
            });
            return res.json({ succes: true });
        }

        res.json(errorJson(
            "error.missing_fields",
            req.body,
            Object.entries(data).filter((entry) => !ObjectUtil.isSet(entry[1])).map((entry) => entry[0]))
        );
    });

const errorJson = (errorType: string, fields?: { [key: string]: string }, missingFields?: string[]): {} => {
    const errorJson: any = {};

    if (fields) errorJson["fields"] = { ...fields, password: undefined, password_verify: undefined };
    if (missingFields) errorJson["missing_fields"] = missingFields.map((field) => `field.${field}`);

    return {
        succes: false,
        error: errorType,
        ...errorJson
    }
}

router.route("/device-alias")
    .post(async (req: Request, res: Response) => {
        const {deviceIndex, alias} = req.body;
        let index : number = parseInt(deviceIndex); 
        // console.log(`The deviceindex = ${index} and the alias = ${alias}`)
        await DataProcessor.ChangeDeviceAlias(index, alias)
        res.sendStatus(200);
    })

module.exports = router;