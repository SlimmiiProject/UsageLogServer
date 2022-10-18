import React from "react";
import { MeerdereData } from "./Graph";
import Graph from "./Graph";
import { Idata, Idevice } from "../App";
import { MemoryRouter } from "react-router-dom";

export default function App({
  data: { devices },
}: {
  data: { devices: Idevice[] };
}) {
  return (
    <>
      <div className="flex">
        {devices.map((meter) => {
          return (
            <div className="graph">
              <Graph
                data={meter.data}
                titel={meter.nameDevice}
                colorDay={meter.colorDay}
                colorNight={meter.colorNight}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
