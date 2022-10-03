import i18n, { TFunction, TOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

const getJsonForLanguage = (languageKey: string) => require(`./languages/${languageKey}.json`);

const default_english = getJsonForLanguage("en");

export type LanguagesType = typeof languages;
export const languages = {
    en: {
        translation: default_english,
        nativeName: "English"
    },
    nl: {
        translation: getJsonForLanguage("nl"),
        nativeName: "Nederlands"
    },
    de: {
        translation: getJsonForLanguage("de"),
        nativeName: "Deutsch"
    },
    fr: {
        translation: getJsonForLanguage("fr"),
        nativeName: "Français"
    }
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: false,
        interpolation: {
            skipOnVariables: false
        },
        resources: languages
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
        if (!this.containsTranslationKey(key)) console.warn("Couldn't find translation for:", key);
        return i18n.t(key, tFunction);
    }

    private static containsTranslationKey(key: string) {
        return default_english[key];
    }
}