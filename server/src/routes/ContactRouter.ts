import { DataProcessor } from "./../data/DataProcessing";
import express, { Request, Response } from "express";
import { Mailer } from "./../utils/mail/Mailer";
import { MailTemplate } from "./../utils/mail/MailTemplate";
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
    data.subject
  );
  const mailTemplate: string = MailTemplate.create("form_Confirm", {
    name: `${data.firstname} ${data.lastname}`,
  });
  await Mailer.INSTANCE.sendMailTo(data.email, data.subject, mailTemplate);
});

module.exports = router;
