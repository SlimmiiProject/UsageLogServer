
import fs from "fs";
import path from "path";
import { parse } from 'node-html-parser';
import { AssetUtil } from "../AssetUtil";

export class MailTemplate {

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

    /**
     * It takes a string of HTML and replaces all the placeholders with the data provided.
     * @param data - { [key: string]: string }
     * @returns The compiled HTML string.
     */
    private compile(data: { [key: string]: string }): string {
        let compiledMailHtml = this.content;

        Object.entries(data).forEach((entry) =>
            compiledMailHtml = compiledMailHtml.replaceAll(`%${entry[0]}%`, entry[1])
        );

        return MailTemplate.mainHtml.replace("%content%", compiledMailHtml);
    }

    /* Reading the content of the html file and returning it. */
    private getTemplateContent(identifier: string): string {
        const dir = AssetUtil.getPath(path.join("mail", "templates", `${identifier}.html`));
        const content = fs.readFileSync(dir, { encoding: "utf8" });
        return content;
    }

    private static getStyleSheetContent() {
        const dir = AssetUtil.getPath(path.join("mail", "templates", "main", "mainStyle.css"));
        const content = fs.readFileSync(dir, { encoding: "utf8" });
        return content;
    }

    private static getMainContent() {
        const dir = AssetUtil.getPath(path.join("mail", "templates", "main", "main.html"));
        const content = fs.readFileSync(dir, { encoding: "utf8" });
       
        const root = parse(content);
        root.querySelector("head").appendChild(parse(`<style>${MailTemplate.getStyleSheetContent()}</style>`));

        return root.toString();
    }
}