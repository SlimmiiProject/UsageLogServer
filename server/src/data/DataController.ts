import { Translations } from "./entities/Translations";
import fs from "fs";
import path from "path";

export type TranslationType = {
    [key: string]: {
        nativeName: string;
        translation: { [key: string]: string }
    }
};

export class DataController {

    private static _translationJson: TranslationType;
    public static getTranslationJson(): Object {
        if (!this._translationJson) this._translationJson = this.setupTranslationJson();
        return this._translationJson;
    }

    private static setupTranslationJson(): TranslationType {
        const translationSetup: TranslationType = {};

        const mainFile: { [key: string]: string } = JSON.parse(fs.readFileSync(__dirname + "/languages/_main.json", { encoding: "utf8" }));

        Object.entries(mainFile).forEach((pair) => {
            translationSetup[pair[0]] = {
                nativeName: pair[1],
                translation: JSON.parse(fs.readFileSync(path.join(__dirname, "/languages/", pair[0] + ".json"), { encoding: "utf-8" }))
            }
        });

        return translationSetup;
    }
}