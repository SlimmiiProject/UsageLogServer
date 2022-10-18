import React from "react";
import { MeerdereData } from "./Graph";
import Graph from "./Graph";
import { Idata } from "../App";
import { MemoryRouter } from "react-router-dom";

interface Device {
  nameDevice: string;
  data: Datum[];
}

interface Datum {
  name: string;
  dag: number;
  nacht: number;
}

export default function App({
  data: { devices },
}: {
  data: { devices: Device[] };
}) {
  return (
    <>
      <div className="flex">
        {devices.map((meter) => {
          return (
            <div className="graph">
              <Graph data={meter.data} titel={meter.nameDevice} />
            </div>
          );
        })}
      </div>
    </>
  );
}
