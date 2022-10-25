import React from "react";
import "../styles.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

export interface Data {
  name: string;
  dag: number;
  nacht: number;
}

export interface MeerdereData {
  data: Data[];
  titel: string;
  colorDay?: string;
  colorNight?: string;
}

export default function App(props: MeerdereData) {
  let colorDay = props.colorDay;
  let colorNight = props.colorNight;
  if (colorDay === undefined) {
    colorDay = "#ffbc40";
  }
  if (colorNight === undefined) {
    colorNight = "#00008b";
  }
  return (
    <>
      <h3>{props.titel}</h3>
      <div className="flex">
        <BarChart
          width={900}
          height={500}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="dag" fill={colorDay} />
          <Bar dataKey="nacht" fill={colorNight} />
        </BarChart>
      </div>
    </>
  );
}
