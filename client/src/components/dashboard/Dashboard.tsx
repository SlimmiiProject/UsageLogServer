import { useContext, useEffect, useState } from "react";
import { IDevice, userContext } from "../../App";
import { IOUtil } from "../../util/IOUtil";
import Graph from "./Graph";
import { CircularProgress, Typography } from "@mui/material";
import { I18n } from "../../util/language/I18n";

type timePeriod = "Day" | "Week" | "Month";

export default function App() {
  const context = useContext(userContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [timePeriod, setTimePeriod] = useState<timePeriod>(localStorage.getItem("timePeriod_dashboard") as timePeriod || "Week");

  useEffect(() => {
    if (context.isLoggedIn) {
      setLoading(true);

      const abortController = new AbortController();
      IOUtil.getDevicesData(timePeriod, abortController).then((res) => {
        setDevices(res);
        setLoading(false);
      });

      return () => abortController.abort();
    }
  }, [timePeriod, context.isLoggedIn]);

  const changeTimePeriod = (period: string) => {
    localStorage.setItem("timePeriod_dashboard", period)
    setTimePeriod(period as timePeriod);
  }

  return (
    <>
      <div>
        <select
          className="dropdown"
          onChange={(e) => {
            setLoading(true);
            changeTimePeriod(e.target.value);
            const abortController = new AbortController();
            return () => abortController.abort();
          }}
          value={timePeriod}
        >
          <option value="Month">{I18n.t("dashboard.month")}</option>
          <option value="Week">{I18n.t("dashboard.week")}</option>
          <option value="Day">{I18n.t("dashboard.day")}</option>
        </select>

        <div className="flexDashboard">
          {!loading && devices.length ===0 ?<Typography>{I18n.t("dashboard.noDevice")}</Typography>:<></>}
          {!loading &&
            devices.map((meter) => (
              <section
                className="graph"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.0)",
                  minWidth: "700px",
                  height: "inherit",
                  color: "black"
                }}
              >
                <Graph
                  data={meter.data}
                  titel={meter.nameDevice}
                  colorDay={meter.colorDay}
                  colorNight={meter.colorNight}
                />
              </section>
            ))}

          {loading && devices.length === 0 && (
            <section
              className="graph"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.0)",
                justifyContent: "center",
                justifyItems: "center",
                alignItems: "center",
                borderWidth: 0,
              }}
            >
              <CircularProgress />
            </section>
          )}
        </div>
      </div>
    </>)
}
