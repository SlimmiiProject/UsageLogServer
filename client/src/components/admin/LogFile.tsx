import { I18n } from "../../util/language/I18n";
import {List,ListItem,ListItemText,Typography} from "@mui/material";
import { AdminUtil } from "../../util/AdminUtil";
import { useState } from "react";

export const LogFile = ():JSX.Element => {
const [files,setFiles] = useState<any[]>([]);
const [isloading,setisloading]=useState<boolean>(false);
const populateFiles = ()=>{
  AdminUtil.getLogs().then((result)=>{
    console.log(result)
  setFiles(result)
  setisloading(!isloading);
  } )
}  
populateFiles();
return (
    <>
      <div className="flexbox">
        <h2>{I18n.t("logger.title")}</h2>
        <List>
          <ListItem alignItems="flex-start">

            {isloading ? ( files.map((file)=>(
                <ListItemText primary={file.date.toString()} secondary={
                  <>
                  <Typography sx={{display:"inline"}} component="span" color="text.primary"><>{I18n.t("logger.account_id")}: {file.account_id}</></Typography>
                  {`${I18n.t("logger.Description")}: ${file.description} ${I18n.t("logger.Address")}: ${file.ipaddress}`}
                  </>
                }/>
            ))) : (<><h2>LOADING...</h2></>)}
          </ListItem>
        </List>
      </div>
    </>
  );
};
