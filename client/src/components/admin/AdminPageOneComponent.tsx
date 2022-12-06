import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded";
import SettingsRemoteRoundedIcon from "@mui/icons-material/SettingsRemoteRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import { NavLink } from "react-router-dom";
import { I18n } from "../../util/language/I18n";

export const AdminPageOneComponent = ({ title, icon, link }: { title: string; icon: string; link: string; }): JSX.Element => {

  const getIconForName = (iconName: string) => {
    switch (iconName) {
      case "profile": return <AccountCircleRoundedIcon style={{ fontSize: "6rem", textAlign: "center", color: "white" }} />;
      case "log": return <TextSnippetRoundedIcon style={{ fontSize: "6rem", textAlign: "center", color: "white" }} />;
      case "device": return <SettingsRemoteRoundedIcon style={{ fontSize: "6rem", textAlign: "center", color: "white" }} />;
      case "translate": return <TranslateRoundedIcon style={{ fontSize: "6rem", textAlign: "center", color: "white" }} />
      default: return <AddBoxRoundedIcon style={{ fontSize: "6rem", textAlign: "center", color: "white" }} />
    }
  }

  return (<>
    <NavLink to={link} style={{ textDecoration: "none" }}>
      <div className="flexbox">
        <div className="flex padvert1-5"> {getIconForName(icon)} </div>
        <h2 className="small center">{title}</h2>
      </div>
    </NavLink>
  </>);
};
