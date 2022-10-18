import React from "react";
import { MeerdereData } from "./Graph";
import Graph from "./Graph";
import { Idata } from "../App";

export default function App({
  data: { data1, data2, data3 },
}: {
  data: { data1: Idata[]; data2: Idata[]; data3: Idata[] };
}) {
  return (
    <>
      <div className="flex">
        <div className="grafiek">
          <Graph data={data1} titel="Meter 1" />
        </div>
        <div className="grafiek">
          <Graph data={data2} titel="Meter 2" />
        </div>
        <div className="grafiek">
          <Graph data={data3} titel="Testmeter" />
        </div>
      </div>
    </>
  );
}
