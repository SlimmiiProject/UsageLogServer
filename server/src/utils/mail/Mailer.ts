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
            secure: smtp_port === 465, // true for 465, false for other ports
            auth: {
                user: username,
                pass: password
            }
        });
    }

    /**
     * It sends an email to a single receiver.
     * @param {string} receiver - The email address of the person you want to send the email to.
     * @param {string} subject - The subject of the email
     * @param {string} htmlCOntent - The HTML content of the email.
     */
    public sendMailTo = async (receiver: string, subject: string, htmlCOntent: string) => {
        this.sendMailToAll([receiver], subject, htmlCOntent);
    }

    /**
     * "If the array of receivers is empty or the subject is empty, return. Otherwise, for each
     * receiver, if the receiver is not a valid email address, continue. Otherwise, send the email."
     * </code>
     * @param {string[]} receivers - string[] - An array of email addresses to send the email to.
     * @param {string} subject - The subject of the email
     * @param {string} htmlContent - string - The html content of the email
     * @returns Nothing.
     */
    public sendMailToAll = async (receivers: string[], subject: string, htmlContent: string) => {
        if (receivers.length === 0 || subject === "") return;

        for (const receiver of receivers) {
            if (!RegExpVal.validate(receiver, RegExpVal.emailValidator)) continue;

            this._transporter.sendMail({
                from: `"SlimmiiMeter" <${username}>`,
                to: receiver,
                subject: subject,
                html: htmlContent,
            }).catch(error => Logger.error(error));
        }
    }
}