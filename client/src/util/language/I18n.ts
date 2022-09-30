import i18n, { TFunction, TOptions } from "i18next";
import { initReactI18next, Translation, useTranslation } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export type LanguagesType = typeof languages;
export const languages = {
    en: { nativeName: "English" },
    nl: { nativeName: "Nederlands" },
    fr: { nativeName: "Français" },
    de: { nativeName: "Deutsch" }
};

const getJsonForLanguage = (name: string) => {
    return require(`./languages/${name}.json`);
}

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: false,
        interpolation: {
            skipOnVariables: false
        },
        resources: {
            en: {
                translation: getJsonForLanguage("en")
            },
            nl: {
                translation: getJsonForLanguage("nl")
            },
            de: {
                translation: getJsonForLanguage("de")
            },
            fr: {
                translation: getJsonForLanguage("fr")
            }
        }
    }
    );

export class I18n {

    /**
     * It takes a key, and returns the translation.
     * 
     * For use with custom data (multiple allowed):
     * I18n.t("custom.test", {val: 9})}
     * Within language file:
     * We got {{val}} problems
     * 
     * @param {string} key - The key of the translation to get.
     * @returns Translation for key
     */
    public static t(key: string, tFunction?: TFunction | TOptions): string {
        return i18n.t(key, tFunction);
    }
}