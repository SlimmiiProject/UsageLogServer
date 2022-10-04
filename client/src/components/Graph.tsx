import React from "react";
import '../styles.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";

export interface Data {
  name: string,
  dag: number,
  nacht: number
};

export interface MeerdereData {
  data: Data[],
  titel: string
}

export default function App(props:MeerdereData) {
  return (
    <>
    <h3>{props.titel}</h3>
    <BarChart
      width={600}
      height={300}
      data={props.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="nacht" fill="#8884d8" />
      <Bar dataKey="dag" fill="#82ca9d" />
    </BarChart>
    </>
  );
}
