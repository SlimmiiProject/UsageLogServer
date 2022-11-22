import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine, Bar } from "recharts";
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

  return (
    <>
      <h3>{props.titel}</h3>
      <div className="flex" style={{backgroundColor:"rgba(0, 0, 0, 0.0)"}}>
        <BarChart width={900} height={500} data={props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} style={{backgroundColor:"rgba(0, 0, 0, 0.0)"}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey={"day"} name={I18n.t("graph.day")} fill={colorDay} />
          <Bar dataKey={"night"} name={I18n.t("graph.night")} fill={colorNight} />
        </BarChart>
      </div>
    </>
  );
}
