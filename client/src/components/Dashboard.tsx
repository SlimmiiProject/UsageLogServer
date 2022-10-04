import React from "react";
import { MeerdereData } from './Graph';
import Graph from './Graph'

export default function App() {
  const data1 = [
    {
      name: "Page A",
      dag: 4000,
      nacht: 2400
    },
    {
      name: "Page B",
      dag: -3000,
      nacht: 1398
    },
    {
      name: "Page C",
      dag: -2000,
      nacht: -3000
    },
    {
      name: "Page D",
      dag: 2780,
      nacht: 3908
    },
    {
      name: "Page E",
      dag: -1890,
      nacht: 4800
    },
    {
      name: "Page F",
      dag: 2390,
      nacht: -3800
    },
    {
      name: "Page G",
      dag: 3490,
      nacht: 4300
    }
  ];
  const data2 = [
    {
      name: "Dinsdag",
      dag: 500,
      nacht: 20
    },
    {
      name: "Woensdag",
      dag: 200,
      nacht: -10
    },
    {
      name: "Donderdag",
      dag: 5000,
      nacht: 360
    },
    {
      name: "Vrijdag",
      dag: 2500,
      nacht: 2500
    },
    {
      name: "Zaterdag",
      dag: -150,
      nacht: 28
    },
    {
      name: "Zondag",
      dag: 248,
      nacht: -36
    },
    {
      name: "Maandag",
      dag: 898,
      nacht: 247
    }
  ];
  return (
    <>
    <div className="grafiek">
    <Graph data={data1} titel="Meter 1"/>
    </div>
    <div className="grafiek">
      <Graph data={data2} titel="Meter 2"/>
    </div>
    </>
  );
}
