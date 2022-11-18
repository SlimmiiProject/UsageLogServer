import { replaceLanguageUrl } from "../util/BrowserUtil";
import { I18n } from "../util/language/I18n";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const LanguageSelector: React.FC = () => {


  return (
    <Select
      name="languageSelector"
      id="languageSelector"
      onChange={(e) => {
        const value = e.target.value;
        return I18n.changeLanguage(value, () => replaceLanguageUrl(I18n.currentLanguage, value));
      }}
      value={I18n.currentLanguage}
    >

      {Object.entries(I18n.translationConfig).map((entry) => {
        const languageKey = entry[0];
        const nativeName = entry[1].nativeName;
        return (<MenuItem key={languageKey} value={languageKey}>{nativeName}</MenuItem>);
      })}

    </Select>
  );
};