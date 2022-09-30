import i18n from "i18next";
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

const getJsonForName = (name: string) => {
    return require(`./languages/${name}.json`);
}

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        updateMissing: true,
        debug: true,
        resources: {
            en: {
                translation: getJsonForName("en")
            },
            nl: {
                translation: getJsonForName("nl")
            },
            de: {
                translation: getJsonForName("de")
            },
            fr: {
                translation: getJsonForName("fr")
            }
        }
    }
    );

export class I18n {

    /**
     * It takes a key, and returns the translation.
     * @param {string} key - The key of the translation to get.
     * @returns Translation for key
     */
    public static t(key: string): string {
        return i18n.t(key);
    }
}