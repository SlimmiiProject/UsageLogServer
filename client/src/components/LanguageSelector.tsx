import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { reloadBrowser } from "../util/BrowserUtil";
import { I18n } from "../util/language/I18n";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <Select
      name="languageSelector"
      id="languageSelector"
      onChange={(e) => i18n.changeLanguage(e.target.value, reloadBrowser)}
      value={i18n.resolvedLanguage}
    >
      {Object.entries(I18n.translationConfig).reverse().map((entry) => {
        const languageKey = entry[0];
        const nativeName = entry[1].nativeName;

        return (
          <MenuItem key={languageKey} value={languageKey}>
            {nativeName}
          </MenuItem>
        );
      })}
      
    </Select>
    
  );
};
