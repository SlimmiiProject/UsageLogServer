import { I18n } from "../../util/language/I18n";
import Button from "@mui/material/Button";

const AddSensor = (): JSX.Element => <Button type="submit"> {I18n.t("sensor.add")} </Button>;

export default AddSensor;
