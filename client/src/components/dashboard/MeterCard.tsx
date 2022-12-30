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
  const saveAlias = async()=>{
    const controller = new AbortController()
    await IOUtil.changeDeviceAlias(deviceIndex,alias,controller);
    reloadDevices()
    HandleClickCloseDialog()
  }
  return (
    <Card 
    elevation={8} 
      sx={{ 
        minWidth: 275, 
        maxWidth:500, 
        margin:".5rem"}}>
      <CardContent sx={{maxHeight:150}}>
        <Typography variant="h5" component="div">
          <>
            {I18n.t("metercard.name")}:{" "}
            {friendlyName !== null ? friendlyName  : <>{I18n.t("metercard.basicCard")}</>}
          </>
        </Typography>
        <Typography variant="h6">
          {I18n.t("metercard.deviceIndex")}: {deviceIndex}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {I18n.t("metercard.id")}: {deviceId}
        </Typography>

        <Typography variant="subtitle1" component="div" sx={{ opacity: "50%" }}>
          {I18n.t("metercard.battery")}: {batteryPercentage === null? I18n.t("metercard.bateryData"): batteryPercentage + "%"}
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
              <DialogTitle>Change Device Alias</DialogTitle>
              <DialogContent sx={{display:"flex", flexDirection:"column", rowGap:".3rem"}}>
<DialogContentText>
  <Typography>
    Change the display name for this device
  </Typography>
</DialogContentText>
<TextField label="alias" required onChange={(e)=>setAlias(e.target.value)}/>
              </DialogContent>
              <DialogActions>
                <Button onClick={HandleClickCloseDialog} color="error">Cancel</Button>
                <Button onClick={saveAlias} color="success">Save</Button>
              </DialogActions>
            </Dialog>
      </Box>
    </Card>
  );
}
