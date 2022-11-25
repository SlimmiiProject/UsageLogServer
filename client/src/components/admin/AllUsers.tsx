import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { AdminUtil, userData } from "../../util/AdminUtil";
import { I18n } from "../../util/language/I18n";

export const AllUsers = (): JSX.Element => {
  const [users,setusers] = useState<userData[]>([]);
  const [isloading,setisloading] = useState<boolean>(true);

  useEffect(()=>{
    const controller = new AbortController();
    setisloading(true);
    AdminUtil.getUsers(controller).then((result)=>{
      setusers(result);
      setisloading(false);
    });
    return ()=>controller.abort();
  },[])
  return (
    <>
      <Box className="flexbox" style={{margin:"auto",justifyContent:"center",flexDirection:"column",display:"flex",backgroundColor:"rgba(0,0,0,0.0)"}}>
        <AccountCircleRoundedIcon />
        <h2>{I18n.t("allUsers.List")}</h2>
        
      </Box>
    </>
  );
};
