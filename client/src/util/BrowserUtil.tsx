export const reloadBrowser = () => window.location.reload();

export const replaceLanguageUrl = (prevLang:string, newLang:string) => {
    window.location.replace(window.location.origin + window.location.pathname.replace(`/${prevLang}/`, `/${newLang}/`))
}