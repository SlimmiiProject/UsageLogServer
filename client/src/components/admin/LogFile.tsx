import { I18n } from "../../util/language/I18n";
import {List,ListItem,ListItemText,Typography} from "@mui/material";
export const LogFile = (): JSX.Element => {
  const files:Logfile[] = [];
  return (
    <>
      <div className="flexbox">
        <h2>{I18n.t("logger.title")}</h2>
        <List>
          <ListItem alignItems="flex-start">
            {files.map((file)=>(
                <ListItemText primary={file.date.toString()} secondary={
                  <>
                  <Typography sx={{display:"inline"}} component="span" color="text.primary"><>{I18n.t("logger.acount_id")}: {file.account_id}</></Typography>
                  {`${I18n.t("logger.Description")}: ${file.description} ${I18n.t("logger.address")}: ${file.ipaddress}`}
                  </>
                }/>
            ))}
          </ListItem>
        </List>
      </div>
    </>
  );
};
