import React, { useEffect, useState } from "react";
import { I18n } from "../util/language/I18n";
import Button from '@mui/material/Button';

const AddSensor = (): JSX.Element => {
  return (
  <>
    <Button type="submit">{I18n.t("sensor.add")}</Button>
  </>);
};

export default AddSensor;