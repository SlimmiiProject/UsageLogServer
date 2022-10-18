import { Translations } from "./entities/Translations";

export class DataController {

    public static async getTranslationJson(): Promise<Object> {
        let translationSetup: any = {};

        const languages: Translations[] = await Translations.find();

        languages.forEach(language => {
            translationSetup[language.lang_key] = {
                nativeName: language.nativeName,
                translation: JSON.parse(language.translations)
            }
        });

        return translationSetup;
    }

}