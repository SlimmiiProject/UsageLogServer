import { IDevice } from "../../App";
import Graph from "./Graph";

export default function App({ data: { devices } }: { data: { devices: IDevice[] }; }) {
  return (<>
    <div className="flex">
      {devices.map((meter) => {
        return (
          <div className="graph">
            <Graph data={meter.data} titel={meter.nameDevice} colorDay={meter.colorDay} colorNight={meter.colorNight} />
          </div>
        );
      })}
    </div>
  </>);
}
