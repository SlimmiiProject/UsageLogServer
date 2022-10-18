import React, { useEffect, useState } from "react";
import { I18n } from "../util/language/I18n";
import MeterCard from "./MeterCard";

const Devices = (): JSX.Element => {
  return (
  <>
    <h1>apparaatbeheer</h1>
    <h2>sample metercard</h2>
    <MeterCard/>
  </>);
};

export default Devices;
