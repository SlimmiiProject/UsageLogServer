import { Translations } from "./entities/Translations";
import fs from "fs";
import path from "path";

export class DataController {

    public static async getTranslationJson(): Promise<Object> {
        let translationSetup: any = {};

        const mainFile: { [key: string]: string } = JSON.parse(fs.readFileSync(__dirname +"/languages/_main.json", { encoding: "utf8" }));

        Object.entries(mainFile).forEach((pair) => {
            console.log(pair[0])
            translationSetup[pair[0]] = {
                nativeName: pair[1],
                translation: JSON.parse(fs.readFileSync(path.join( __dirname,"/languages/", pair[0] + ".json"), {encoding: "utf-8"}))
            }
        });

        return translationSetup;
    }

}