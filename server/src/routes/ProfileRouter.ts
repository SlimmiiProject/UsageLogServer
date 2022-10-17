import { AccountManager } from './../accounts/AccountManager';
import { InputUtil } from './../utils/InputUtil';
import express, { Request, Response } from "express";
import { Crypt } from '../utils/Crypt';
import { SessionManager } from '../accounts/SessionManager';
const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {

});

router.post("/logout", async (req: Request, res: Response) => {
    
});

router.post("/create-profile", async (req: Request, res: Response) => {
    let body = req.body;

    const data: { [key: string]: string } = {
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

        res.json(errorJson("Account already exists", body));
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