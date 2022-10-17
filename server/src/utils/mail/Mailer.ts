import { RegExpVal } from '../RegexValidator';
import nodemailer from 'nodemailer';
import { Environment } from '../Environment';
import { Logger } from '../Logger';

const { smtp_host, smtp_port, username, password } = Environment.CONFIG.mailer;

export class Mailer {
    private static _instance: Mailer;
    public static get INSTANCE() {
        if (this._instance == null) this._instance = new Mailer();
        return this._instance;
    }

    private readonly _transporter;

    constructor() {
        this._transporter = nodemailer.createTransport({
            host: smtp_host,
            port: smtp_port,
            secure: false, // true for 465, false for other ports
            auth: {
                user: username,
                pass: password
            }
        });
    }

    public async sendMailTo(receiver:string, subject:string, htmlCOntent:string) {
        this.sendMailToAll([receiver], subject, htmlCOntent);
    }

    public async sendMailToAll(receivers: string[], subject: string, htmlContent: string) {
        if (receivers.length === 0 || subject === "") return;

        // Do all receivers match mail format
        if (!receivers.every(receiver => RegExpVal.validate(receiver, RegExpVal.emailValidator))) return;

        this._transporter.sendMail({
            from: `"SlimmiiMeter" <${username}>`,
            to: receivers.join(","),
            subject: subject,
            html: htmlContent,
        }).catch(error => Logger.error(error));
    }
}