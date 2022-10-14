import { AccountManager } from './../accounts/AccountManager';
import { InputUtil } from './../utils/InputUtil';
import express, { Request, Response } from "express";
import { Crypt } from '../utils/Crypt';
const router = express.Router();

router.post("/create-profile", async (req: Request, res: Response) => {
    const body = req.body;

    const data = {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone_number: body.phone_number,
        password: body.password
    }

    /* Checking if all the values in the data object are set. */
    if (Object.values(data).every(InputUtil.isSet)) {
        const hashedPassword = Crypt.encrypt(data.password);

        if (await AccountManager.createAccount(data.first_name, data.last_name, data.email, hashedPassword, data.phone_number) > 0) {
            res.json({ succes: true });
            return;
        }

        res.json({status:false, error: "Account already exists"});
        return;
    }

    res.json({
        succes: false,
        error: "Missing fields",
        missing: Object.entries(data).filter((entry) => !InputUtil.isSet(entry[1])).map((entry) => entry[0]),
        fields: req.body
    });
});

router.delete("/delete-profile", async (req: Request, res: Response) => {
    // Delete account
});

module.exports = router;