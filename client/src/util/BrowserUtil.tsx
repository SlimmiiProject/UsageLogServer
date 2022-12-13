export const reloadBrowser = () => window.location.reload();

/**
 * It replaces the current language in the URL with the new language.
 * @param {string} prevLang - The language that is currently being used.
 * @param {string} newLang - The new language to change to.
 */
export const replaceLanguageUrl = (prevLang: string, newLang: string) => {
    const newLocation = window.location.origin + window.location.pathname.replace(`/${prevLang}/`, `/${newLang}/`);
    window.location.replace(newLocation);
}

/**
 * It takes the URL of the page and grabs the language from it.
 * @returns The first element of the array returned by the split method.
 */
export const getLanguageFromUrl = () => window.location.pathname.split("/")[1];

export const getFullPath = () => {
    const pathName = window.location.pathname;
    return pathName.substring(1, pathName.length) + window.location.search;
}