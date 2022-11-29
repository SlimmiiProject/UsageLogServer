import { I18n } from "../../util/language/I18n";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { AdminUtil, LogData } from "../../util/AdminUtil";
import { useEffect, useState } from "react";

export const LogFile = (): JSX.Element => {
  const [files, setFiles] = useState<LogData[]>([]);
  const [isloading, setisloading] = useState<boolean>(true);
 
  useEffect(() => {
    const controller = new AbortController();

    setisloading(true);
    AdminUtil.getLogs(controller).then((result) => {
      setFiles(result)
      setisloading(false);
    });
    return () => controller.abort();

  }, [])

  return (
    <>
      <Box className="flexbox" style={{margin:"auto", justifyContent:"center",flexDirection:"column", display:"flex", alignItems:"center" , borderWidth:3,borderColor:"grey",borderRadius:15, width:500,height:"fit-content", backgroundColor:"rgba(0,0,0,0.0)"}}>
        <h2>{I18n.t("logger.title")}</h2>
        <List>
          {!isloading ? (files.map((file)=>(
            <ListItem alignItems="flex-start">
            <ListItemText primary={file.date.toString()} secondary={
                <>
                <div className="listItemContent">
                  <Typography sx={{ display: "inline" }} component="span" color="text.primary"><>{I18n.t("logger.Account_id")} </></Typography>
                  <br></br>{`${I18n.t("logger.Description")}:\n${file.description}`}<br></br>{`${I18n.t("logger.Address")}: ${file.ipaddress}`}
                  </div>
                </>
              } />
              </ListItem>
          ))): (<><h2>LOADING...</h2></>)}
        </List>
      </Box>
    </>
  );
};
