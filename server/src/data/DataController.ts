import fs from "fs";
import path from "path";
import { AssetUtil } from "../utils/AssetUtil";
import { Converter } from "../utils/Converter";

export type TranslationType = {
    [key: string]: {
        nativeName: string;
        render:boolean;
        translation: { [key: string]: string }
    }
};

export class DataController {

    private static _translationJson: TranslationType;
    public static getTranslationJson(): Object {
        if (!this._translationJson) this._translationJson = this.setupTranslationJson();
        return this._translationJson;
    }

    private static setupTranslationJson = (): TranslationType => {
        const translationSetup: TranslationType = {};
        const mainFile: { [key: string]: [string, boolean] } = JSON.parse(fs.readFileSync(AssetUtil.getPath("/languages/_main.json"), { encoding: "utf8" }));

        Object.entries(mainFile).forEach((pair) => translationSetup[pair[0]] = {
            nativeName: pair[1][0],
            render: pair[1][1],
            translation: JSON.parse(fs.readFileSync(AssetUtil.getPath(path.join("languages", pair[0] + ".json")), { encoding: "utf-8" }))
        });

        return translationSetup;
    }
}