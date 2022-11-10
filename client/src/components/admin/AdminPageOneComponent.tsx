import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded";
import SettingsRemoteRoundedIcon from "@mui/icons-material/SettingsRemoteRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import { NavLink } from "react-router-dom";

export const AdminPageOneComponent = ({
  title,
  icon,
  link,
}: {
  title: string;
  icon: string;
  link: string;
}): JSX.Element => {
  return (
    <>
      <NavLink to={link} style={{ textDecoration: "none" }}>
        <div className="flexbox">
          <div className="flex padvert1-5">
            {icon === "profile" ? (
              <AccountCircleRoundedIcon
                style={{
                  fontSize: "6rem",
                  textAlign: "center",
                  color: "white",
                }}
              />
            ) : icon === "log" ? (
              <TextSnippetRoundedIcon
                style={{
                  fontSize: "6rem",
                  textAlign: "center",
                  color: "white",
                }}
              />
            ) : icon === "device" ? (
              <SettingsRemoteRoundedIcon
                style={{
                  fontSize: "6rem",
                  textAlign: "center",
                  color: "white",
                }}
              />
            ) : icon === "translate" ? (
              <TranslateRoundedIcon
                style={{
                  fontSize: "6rem",
                  textAlign: "center",
                  color: "white",
                }}
              />
            ) : (
              <AddBoxRoundedIcon
                style={{
                  fontSize: "6rem",
                  textAlign: "center",
                  color: "white",
                }}
              />
            )}
          </div>
          <h2 className="small center">{title}</h2>
        </div>
      </NavLink>
    </>
  );
};
