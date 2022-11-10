import { DataProcessor } from './../data/DataProcessing';
import express, { Request, Response } from "express";
const router = express.Router();

type ContactFormData = {
    firstname: string,
    lastname: string,
    email: string,
    subject: string,
    description: string;
}

router.post("/", async (req: Request, res: Response) => {
    const data: ContactFormData = req.body;
    await DataProcessor.CreateContactForm(data.email, data.description, data.subject, data.firstname, data.lastname);
});

module.exports = router;