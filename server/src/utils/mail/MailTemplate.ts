
import fs from "fs";
import path from "path";

export class MailTemplate {

    private static templates: Map<string, MailTemplate> = new Map();

    private content: string;

    public static create(identifier: string, options: { [key: string]: any }) {
        if (!this.templates.has(identifier)) this.templates.set(identifier, new MailTemplate(identifier))
        return this.templates.get(identifier).compile(options);
    }

    constructor(identifier: string) {
        this.content = this.getTemplateContent(identifier);
    }

    private compile(data: { [key: string]: string }): string {
        let compiledHTML = this.content;

        Object.entries(data).forEach((entry) => {
            compiledHTML = compiledHTML.replaceAll(`%${entry[0]}%`, entry[1])
        });

        return compiledHTML;
    }

    private getTemplateContent(identifier: string): string {

        const dir = path.join(__dirname, "./templates/", `${identifier}.html`);
        const content = fs.readFileSync(dir, { encoding: "utf8" });
        return content;
    }
}
