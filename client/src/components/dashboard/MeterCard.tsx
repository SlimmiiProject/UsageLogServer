import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { I18n } from "../../util/language/I18n";
export interface DeviceCardProps {
  device_index: number;
  deviceId: string;
  friendlyName: string;
  BatteryPercentage: number;
}
export default function BasicCard({device_index,deviceId,friendlyName,BatteryPercentage}:DeviceCardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {I18n.t("metercard.name")}:
          {friendlyName ? (<Typography>{friendlyName}</Typography>) : <></>}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {I18n.t("metercard.id")}
          <Typography>{deviceId}</Typography>
        </Typography>

        {I18n.t("metercard.chart")}

        <Typography variant="subtitle1" component="div" sx={{ opacity: "50%" }}>
          {I18n.t("metercard.battery")}
          <Typography>{BatteryPercentage}</Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}
