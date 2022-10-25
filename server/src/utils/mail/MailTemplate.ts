
import fs from "fs";
import path from "path";
import { parse } from 'node-html-parser';

export class MailTemplate {

    private static mainStyle = this.getStyleSheetContent();
    private static mainHtml = this.getMainContent();
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
        let compiledMailHtml = this.content;

        Object.entries(data).forEach((entry) =>
            compiledMailHtml = compiledMailHtml.replaceAll(`%${entry[0]}%`, entry[1])
        );

        const root = parse(MailTemplate.mainHtml.replace("%content%", compiledMailHtml));
      
        root.querySelector("head").appendChild(parse(`<style>${MailTemplate.mainStyle}</style>`));
        console.log(root.toString());
        return root.toString();
    }

    private getTemplateContent(identifier: string): string {
        const dir = path.join(__dirname, "./templates/", `${identifier}.html`);
        const content = fs.readFileSync(dir, { encoding: "utf8" });
        return content;
    }

    private static getStyleSheetContent() {
        const dir = path.join(__dirname, "./templates/main/", `mainStyle.css`);
        const content = fs.readFileSync(dir, { encoding: "utf8" });
        return content;
    }

    private static getMainContent() {
        const dir = path.join(__dirname, "./templates/main/", `main.html`);
        const content = fs.readFileSync(dir, { encoding: "utf8" });
        return content;
    }
}
