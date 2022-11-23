import { Avatar, Button } from "@mui/material";
import { I18n } from "../../util/language/I18n";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import { useContext } from "react";

const Profile = (): JSX.Element => {
  const userContextData = useContext(userContext);
  let fullName = [userContextData.userAccount?.firstName, userContextData.userAccount?.lastName].join(" ");

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1)
      hash = string.charCodeAt(i) + ((hash << 5) - hash);

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const stringAvatar = (name: string, width: number = 60, height: number = 60) => {
    return {
      sx: { bgcolor: stringToColor(name), height: height, width: width },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <div className="box">
      <h1>{I18n.t("profile.title")}</h1>
      <div className="flex">
        <Avatar {...stringAvatar(fullName)} />
        <h2>{fullName}</h2>
        <Link to="./edit-profile">
          <Button variant="contained">
            {I18n.t("profile.edit")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
