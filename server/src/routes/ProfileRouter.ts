import { RegExpVal } from './../utils/RegexValidator';
import { AccountManager } from './../accounts/AccountManager';
import { InputUtil } from './../utils/InputUtil';
import express, { Request, Response } from "express";
import { Crypt } from '../utils/Crypt';
const router = express.Router();

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
    if (Object.values(data).every(InputUtil.isSet) && data.password.length >= 8) {
        const hashedPassword = Crypt.encrypt(data.password);

        // Validate entries
        if (!RegExpVal.validate(data.email, RegExpVal.emailValidator) || !RegExpVal.validate(data.phone_number, RegExpVal.phoneValidator)) {
            res.status(500).json(errorJson("Wrong Syntax for email or phone", body));
            return;
        }

        if (await AccountManager.doesAccountExist(0, data.email, data.phone_number)) {
            res.json(errorJson("Account already exists", body));
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

    if (fields) errorJson["fields"] = { password: undefined, password_verify: undefined, ...fields };
    if (missingFields) errorJson["missing"] = { missingFields }

    return {
        succes: false,
        error: errorType,
        ...errorJson
    }
}

module.exports = router;