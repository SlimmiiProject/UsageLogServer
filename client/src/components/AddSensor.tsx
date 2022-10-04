import React, { useEffect, useState } from "react";
import { I18n } from "../util/language/I18n";

const AddSensor = (): JSX.Element => {
  return (
  <>
    <button type="submit">{I18n.t("sensor.add")}</button>
  </>);
};

export default AddSensor;
