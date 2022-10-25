import { I18n } from "./language/I18n";

export const reloadBrowser = () => window.location.reload();

export const replaceLanguageUrl = (prevLang:string, newLang:string) => {
    window.location.replace(window.location.origin + window.location.pathname.replace(`/${prevLang}/`, `/${newLang}/`))
}

export const getLanguageUrl = (path:string) => {
    return I18n.currentLanguage + path;
}

export const getLanguageFromUrl = () => {
   return window.location.pathname.split("/")[1];
}