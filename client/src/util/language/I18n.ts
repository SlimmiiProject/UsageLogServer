import { IOUtil } from './../IOUtil';
import i18n, { Callback, TFunction, TOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

export class I18n {

    private static _translationConfig: { [key: string]: { nativeName: string, translation: { [key: string]: string } } };
    public static get translationConfig() {
        return this._translationConfig;
    }

    public static setup = async () => {
        if (this.translationConfig) return;

        this._translationConfig = await IOUtil.getTranslationConfig();

        i18n.use(LanguageDetector)
            .use(initReactI18next)
            .init({
                fallbackLng: "en",
                debug: false,
                interpolation: {
                    skipOnVariables: false
                },
                resources: this.translationConfig
            });
    }

    public static doesLanguageExist = (language_key: string): boolean => Object.keys(I18n.translationConfig).find((key) => key === language_key) !== undefined;

    /**
     * It takes a key, and returns the translation.
     * 
     * For use with custom data (multiple allowed):
     * I18n.t("custom.test", {val: 9})}
     * Within language file:
     * "custom.test": "We got {{val}} problems"
     * 
     * @param {string} key - The key of the translation to get.
     * @returns Translation for key
     */
    public static t = (key: string, tFunction?: TFunction | TOptions): string => {
        return key.split(" ").map((keyPart) => i18n.t(keyPart, tFunction)).join(" ");
    }

    public static changeLanguage = (language_key: string, callback?: Callback) => i18n.changeLanguage(language_key, callback);


    public static get currentLanguage() {
        return i18n.resolvedLanguage;
    };
}