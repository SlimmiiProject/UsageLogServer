import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { I18n } from "../../util/language/I18n";

export const AllUsers = (): JSX.Element => {
  return (
    <>
      <div className="flexbox">
        <AccountCircleRoundedIcon />
        <h2>{I18n.t("allUsers.List")}</h2>
      </div>
    </>
  );
};
