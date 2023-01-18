import { DataProcessor } from "./../data/DataProcessing";
import express, { Request, Response } from "express";
import { Mailer } from "./../utils/mail/Mailer";
import { MailTemplates } from "../utils/mail/MailTemplates";
import { Middleware } from '../utils/Middleware';
const router = express.Router();

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  description: string;
};

router.route("/")
  .post(async (req: Request, res: Response) => {
  const data: ContactFormData = req.body;
  
  await DataProcessor.createContactForm(data.firstName, data.lastName, data.email, data.description, data.subject);
  
  await Mailer.INSTANCE.sendMailTo(data.email, data.subject, MailTemplates.FORM_CONFIRM({
    name: [data.firstName, data.lastName].join(" "),
    time: Date.now()
  }));

  res.sendStatus(200);
})
.get(Middleware.requireAdminpermission, async (req:Request, res:Response) => {
  res.json(await DataProcessor.getContactForms())
});

module.exports = router;
