import { MailTemplate } from './MailTemplate';

export type DefaultData = {[key:string]:any} & {
    name: string,
    time: number;
}

export class MailTemplates {

    public static VERIFY_EMAIL = (options: DefaultData): string => {
        return MailTemplate.create("verify_email", options);
    }

    public static FORM_CONFIRM = (options: DefaultData) => {
       return MailTemplate.create("form_Confirm", options);
    }
}