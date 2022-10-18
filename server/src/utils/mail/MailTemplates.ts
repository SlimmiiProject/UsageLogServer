import { MailTemplate } from './MailTemplate';

export interface DefaultData {
    name: string,
    time: string;
}

export class MailTemplates {
    
    public static VERIFY_EMAIL(options: DefaultData): string {
        return MailTemplate.create("verify_email", options);
    }

}