import { useState, useContext, useEffect } from "react";
import { I18n } from "../../util/language/I18n";
import MeterCard from "../dashboard/MeterCard";
import { IOUtil } from "../../util/IOUtil";
import { userContext } from "../../App";
import { DeviceCardProps } from "../dashboard/MeterCard";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography";
const Devices = (): JSX.Element => {
  const [isloading, setIsloading] = useState(true);
  const [devices, setDevices] = useState<DeviceCardProps[]>([]);
  const context = useContext(userContext);
  useEffect(() => {
      loadDevices();
      setIsloading(false);
  }, [context.userAccount]);

  const loadDevices = ()=>{
    IOUtil.getOwnDevice(context.userAccount!.id).then((res) => {
    setDevices(res);
    });
  }
  return (
    <>
    <Box>
    <Typography variant="h4" marginLeft="1rem">
        {I18n.t("devices.devicemanager")}
        </Typography>
        <Typography variant="h6" marginLeft="1rem">
        {I18n.t("devices.sample")}
        </Typography>
      <Box sx={{display:"flex",margin:"auto",  aligntItems:"center",alignContent:"center", maxWidth:"90%", flexFlow:"wrap"}}>
        {isloading===true? (<CircularProgress/>):<></>}
        {!isloading &&
          devices.map((dev) => (
            <MeterCard
            batteryPercentage={dev.batteryPercentage}
            deviceIndex={dev.deviceIndex}
            deviceId={dev.deviceId}
            friendlyName={dev.friendlyName}
            reloadDevices={loadDevices}
          />
          ))}

          </Box>
      </Box>
      </>
  );
};

export default Devices;
