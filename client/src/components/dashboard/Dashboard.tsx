import { useEffect, useState } from "react";
import { IDevice } from "../../App";
import { IOUtil } from "../../util/IOUtil";
import Graph from "./Graph";

export default function App() {

  const [loading, setLoading] = useState<boolean>(false);
  const [devices, setDevices] = useState<IDevice[]>([]);

  useEffect(() => {
    setLoading(true);

    const abortController = new AbortController();
    IOUtil.getDevicesData("Day", abortController).then(res => {
      setDevices(res);
      setLoading(false);
    });

    return () => abortController.abort();
  }, []);

  return (<>
    <div className="flex">
      {!loading && devices.map((meter) => {
        return (
          <div className="graph" style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}>
            <Graph data={meter.data} titel={meter.nameDevice} colorDay={meter.colorDay} colorNight={meter.colorNight} />
          </div>
        );
      })}
    </div>
  </>);
}
