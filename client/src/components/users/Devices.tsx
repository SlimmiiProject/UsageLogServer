import { useState, useContext } from "react";
import { I18n } from "../../util/language/I18n";
import MeterCard from "../dashboard/MeterCard";
import {IOUtil} from "../../util/IOUtil"
import { userContext } from "../../App";
import { DeviceCardProps } from "../dashboard/MeterCard";
import { Box } from "@mui/material";
const Devices = (): JSX.Element => {
  const [isloading, setIsloading] = useState(true)
  const [devices, setDevices] = useState<DeviceCardProps[]>()
  const context  = useContext(userContext)
  console.log(context.userAccount!.id)

  IOUtil.getOwnDevice(context.userAccount!.id).then((res)=>{
    console.log(context.userAccount!.id)
    console.log(res)
    setDevices(res)
    setIsloading(false)
  });
  
  return (
    <>
      <h1>{I18n.t("devices.devicemanager")}</h1>
      <h2>{I18n.t("devices.sample")}</h2>
      <Box>
       {isloading && devices?.map((dev)=><MeterCard BatteryPercentage={dev.BatteryPercentage} device_index={dev.device_index} deviceId={dev.deviceId} friendlyName={dev.friendlyName}/>)}
      </Box>
    </>
  );
};

export default Devices;
