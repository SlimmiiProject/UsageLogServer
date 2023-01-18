import { Avatar, Button } from "@mui/material";
import { I18n } from "../../util/language/I18n";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import { useContext, useState , useEffect} from "react";
import { AdminUtil, userData } from "../../util/AdminUtil";
import Box from "@mui/system/Box";

const Profile = (): JSX.Element => {
  const userContextData = useContext(userContext);
  const [user,setUser ] = useState<userData>();
    useEffect(() => {
    AdminUtil.getUser(userContextData.userAccount?.id!).then((res)=>{
      setUser(res);
    })
  }, [userContextData])
  


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
      children: `${user?.firstname.split("")[0]}${user?.lastname.split("")[0]}`,
    };
  }

  return (
    <div className="box">
      <h1>{I18n.t("profile.title")}</h1>
      <div className="flex">
        
        <Avatar {...stringAvatar(user?.firstname! + user?.lastname!)} />
        <Box sx={{display:"flex", flexDirection:"column"}}>
        <h2>{user?.firstname! + user?.lastname!}</h2>
        <h4>email: {user?.email}</h4>
        <h4>phone: {user?.phone}</h4>
        </Box>
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
