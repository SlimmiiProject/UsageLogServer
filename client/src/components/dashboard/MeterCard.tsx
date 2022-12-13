import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { I18n } from "../../util/language/I18n";
export interface DeviceCardProps {
  deviceIndex: number;
  deviceId: string;
  friendlyName: string | undefined;
  batteryPercentage: number | undefined;
}
export default function BasicCard({deviceIndex,deviceId,friendlyName = "not set",batteryPercentage = -222}:DeviceCardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <>
          {I18n.t("metercard.name")}: {friendlyName ? ({friendlyName}) : <></>}
          </>
        </Typography>
        <Typography variant="h6">Device Index: {deviceIndex}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {I18n.t("metercard.id")}{deviceId}
        </Typography>

        

        <Typography variant="subtitle1" component="div" sx={{ opacity: "50%" }}>
          {I18n.t("metercard.battery")}
          <Typography>{batteryPercentage === -222 ? "no data received" : batteryPercentage}</Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}
//{I18n.t("metercard.chart")}