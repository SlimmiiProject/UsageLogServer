import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { I18n } from "../../util/language/I18n";
export interface DeviceCardProps {
  deviceIndex: number;
  deviceId: string;
  friendlyName: string | undefined;
  batteryPercentage: number | undefined;
}
export default function BasicCard({
  deviceIndex,
  deviceId,
  friendlyName,
  batteryPercentage
}: DeviceCardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <>
            {I18n.t("metercard.name")}:{" "}
            {friendlyName == null ? friendlyName  : <>{I18n.t("metercard.basicCard")}</>}
          </>
        </Typography>
        <Typography variant="h6">
          {I18n.t("metercard.deviceIndex")} {deviceIndex}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {I18n.t("metercard.id")}{deviceId}
        </Typography>

        <Typography variant="subtitle1" component="div" sx={{ opacity: "50%" }}>
          {I18n.t("metercard.battery")}{batteryPercentage == undefined? I18n.t("metercard.bateryData"): batteryPercentage + "%"}
        </Typography>
      </CardContent>
    </Card>
  );
}
//{I18n.t("metercard.chart")}
