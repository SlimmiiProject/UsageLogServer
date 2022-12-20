import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine, Bar, ResponsiveContainer } from "recharts";
import "../../styles.css";
import { I18n } from "../../util/language/I18n";

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

  if (colorDay === undefined) colorDay = "#ffbc40";
  if (colorNight === undefined) colorNight = "#00008b";

  // Translate everything before applied
  props.data.forEach((data) => data.name = I18n.t(data.name));

  return (
    <>
      <h3>{props.titel}</h3>

      <ResponsiveContainer maxHeight={400} minWidth={300} minHeight={500} width={"100%"} >
        <BarChart  data={props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey={"day"} name={I18n.t("graph.day")} fill={colorDay} />
          <Bar dataKey={"night"} name={I18n.t("graph.night")} fill={colorNight} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
