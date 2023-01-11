import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import { I18n } from "../../util/language/I18n";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { IOUtil } from "../../util/IOUtil";
export interface DeviceCardProps {
  deviceIndex: number;
  deviceId: string;
  friendlyName: string | undefined;
  batteryPercentage: number | undefined;
  reloadDevices:()=>void
}
export default function BasicCard({
  deviceIndex,
  deviceId,
  friendlyName,
  batteryPercentage,
  reloadDevices
}: DeviceCardProps) {
  const [alias,setAlias] = useState<string>("");
  const [open,setOpen] = useState<boolean>(false);
  const HandleClickCloseDialog = ()=>{
    setOpen(false)
  }
  const HandleClickOpenDialog = ()=>{
    setOpen(true)
  }
  const saveAlias = async () => {
    if (alias === undefined)
    {
      return
    };
    const controller = new AbortController()
    await IOUtil.changeDeviceAlias(deviceIndex,alias,controller);
    HandleClickCloseDialog()
    await reloadDevices() 
  }
  return (
    <Card 
    elevation={10} 
      sx={{ 
        minWidth: 275, 
        maxWidth:500, 
        margin:".5rem"}}>
      <CardContent sx={{maxHeight:180, minHeight:170}}>
        <Typography variant="h5" component="div">
          <>
            {I18n.t("metercard.name")}:{" "}
            {friendlyName !== null ? friendlyName  : <>{I18n.t("metercard.basicCard")}</>}
          </>
        </Typography>
        <Typography variant="h6">
          {I18n.t("metercard.deviceIndex")} {deviceIndex}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {I18n.t("metercard.id")}: {deviceId}
        </Typography>

        <Typography variant="subtitle1" component="div" sx={{ opacity: "50%" }}>
          {batteryPercentage === null? I18n.t("metercard.bateryData"): batteryPercentage + "%"}
        </Typography>
      </CardContent>
      <Box sx={{marginTop:".2rem"}}>
        <CardActions>
          <IconButton onClick={HandleClickOpenDialog}><EditIcon/></IconButton>
          {batteryPercentage !== null && batteryPercentage! <15?(
          <Chip label="Battery Low" color="error" variant="outlined"/>
          ):<></>}
        </CardActions>
            <Dialog onClose={HandleClickCloseDialog} open={open} maxWidth="lg">
              <DialogTitle>{I18n.t("metercard.changeAlias")}</DialogTitle>
              <DialogContent sx={{display:"flex", flexDirection:"column", rowGap:".3rem"}}>
<DialogContentText>
  <Typography>
    {I18n.t("metercard.changeDisplay")}
  </Typography>
</DialogContentText>
<TextField label="alias" required onChange={(e)=>setAlias(e.target.value)}/>
              </DialogContent>
              <DialogActions>
                <Button onClick={HandleClickCloseDialog} color="error">{I18n.t("metercard.cancel")}</Button>
                <Button onClick={saveAlias} color="success">{I18n.t("metercard.save")}</Button>
              </DialogActions>
            </Dialog>
      </Box>
    </Card>
  );
}
