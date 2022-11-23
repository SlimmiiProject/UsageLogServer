import { useContext, useEffect, useState } from "react";
import { IDevice, setUserContext, userContext } from "../../App";
import { IOUtil } from "../../util/IOUtil";
import Graph from "./Graph";

export default function App() {
  const context = useContext(userContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [devices, setDevices] = useState<IDevice[]>([]);

  useEffect(() => {
    if (context.loggedIn) {
      setLoading(true);

      const abortController = new AbortController();
      IOUtil.getDevicesData("Week", abortController).then(res => {
        setDevices(res);
        setLoading(false);
      });

      return () => abortController.abort();
    }
  }, []);

  return (<>
    <div className="flex">

      {!loading && devices.map((meter) => <section className="graph" style={{ backgroundColor: "rgba(0, 0, 0, 0.0)", minWidth: "700px" }}>
        <Graph data={meter.data} titel={meter.nameDevice} colorDay={meter.colorDay} colorNight={meter.colorNight} />
      </section>
      )}

      {!loading && devices.length === 0 && <h2>No Data</h2>}
    </div>
  </>);
}
