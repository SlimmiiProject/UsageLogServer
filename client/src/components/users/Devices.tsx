import { useState, useContext, useEffect } from "react";
import { I18n } from "../../util/language/I18n";
import MeterCard from "../dashboard/MeterCard";
import { IOUtil } from "../../util/IOUtil";
import { userContext } from "../../App";
import { DeviceCardProps } from "../dashboard/MeterCard";
import { Box } from "@mui/material";
const Devices = (): JSX.Element => {
  const [isloading, setIsloading] = useState(true);
  const [devices, setDevices] = useState<DeviceCardProps[]>([]);
  const context = useContext(userContext);
  useEffect(() => {
    IOUtil.getOwnDevice(context.userAccount!.id).then((res) => {
      console.log(res[0]);
      setDevices(res);
      setIsloading(false);
    });
  }, []);
  return (
    <>
      <h1>{I18n.t("devices.devicemanager")}</h1>
      <h2>{I18n.t("devices.sample")}</h2>
      <Box>

        {!isloading &&
          devices.map((dev) => (
            <MeterCard
            batteryPercentage={dev.batteryPercentage}
            deviceIndex={dev.deviceIndex}
            deviceId={dev.deviceId}
            friendlyName={dev.friendlyName}
          />
          ))}
      </Box>
    </>
  );
};

export default Devices;
