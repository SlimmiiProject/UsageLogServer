import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { reloadBrowser } from "../util/BrowserUtil";
import { I18n, LanguagesType } from "../util/language/I18n";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type LanguageSelectorProps = {
  languages: LanguagesType;
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
}) => {
  const { i18n } = useTranslation();

  return (
    <Select
      name="languageSelector"
      id="languageSelector"
      onChange={(e) =>
        i18n.changeLanguage(
          e.target.value as keyof LanguagesType,
          reloadBrowser
        )
      }
      value={i18n.resolvedLanguage}
    >

      {Object.entries(languages).map((entry) => {
        let langSelector = entry[0];
        let currentLanguage = entry[1].nativeName;

        return (
          <MenuItem key={langSelector} value={langSelector}>
            {currentLanguage}
          </MenuItem>
        );
      })}
      
    </Select>
    
  );
};
