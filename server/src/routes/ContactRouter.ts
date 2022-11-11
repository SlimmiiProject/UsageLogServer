import { DataProcessor } from "./../data/DataProcessing";
import express, { Request, Response } from "express";
import { Mailer } from "./../utils/mail/Mailer";
import { MailTemplates } from "../utils/mail/MailTemplates";
const router = express.Router();

type ContactFormData = {
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  description: string;
};

router.post("/", async (req: Request, res: Response) => {
  const data: ContactFormData = req.body;
  await DataProcessor.CreateContactForm(
    data.email,
    data.description,
    data.subject,
    data.firstname,
    data.lastname
  );

  await Mailer.INSTANCE.sendMailTo(data.email, data.subject, MailTemplates.FORM_CONFIRM({
    name: `${data.firstname} ${data.lastname}`,
    time: Date.now()
  }));
});

module.exports = router;
