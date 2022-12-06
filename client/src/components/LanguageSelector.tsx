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
        const previous = I18n.currentLanguage;
        return I18n.changeLanguage(value, () => replaceLanguageUrl(previous, value));
      }}
      value={I18n.currentLanguage}
    >

      {Object.entries(I18n.translationConfig).filter(e => e[1].render).map((entry) => {
        const languageKey = entry[0];
        const nativeName = entry[1].nativeName;
        return (<MenuItem key={languageKey} value={languageKey}>{nativeName}</MenuItem>);
      })}

    </Select>
  );
};