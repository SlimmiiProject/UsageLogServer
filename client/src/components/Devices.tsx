import React, { useEffect, useState } from "react";
import { I18n } from "../util/language/I18n";
import MeterCard from "./MeterCard";

const Devices = (): JSX.Element => {
  return (
  <>
    <h1>{I18n.t("devices.devicemanager")}</h1>
    <h2>{I18n.t("devices.sample")}</h2>
    <MeterCard/>
  </>);
};

export default Devices;
