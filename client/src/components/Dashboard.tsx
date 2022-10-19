import Graph from "./Graph";
import { Idevice } from "../App";

export default function App({ data: { devices } }: { data: { devices: Idevice[] } }) {
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
