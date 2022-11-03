import { I18n } from "./language/I18n";

export const reloadBrowser = () => window.location.reload();

/**
 * It replaces the current language in the URL with the new language.
 * @param {string} prevLang - The language that is currently being used.
 * @param {string} newLang - The new language to change to.
 */
export const replaceLanguageUrl = (prevLang:string, newLang:string) => {
    window.location.replace(window.location.origin + window.location.pathname.replace(`/${prevLang}/`, `/${newLang}/`))
}

/**
 * It takes a path and returns the current language plus the path.
 * @param {string} path - The path to the page you want to link to.
 * @returns The current language + the path.
 */
export const getLanguageUrl = (path:string) => {
    return I18n.currentLanguage + path;
}

/**
 * It takes the URL of the page and grabs the language from it.
 * @returns The first element of the array returned by the split method.
 */
export const getLanguageFromUrl = () => {
   return window.location.pathname.split("/")[1];
}