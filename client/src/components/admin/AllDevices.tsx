import { AdminUtil, deviceData } from "../../util/AdminUtil";
import { useState, useEffect } from "react";
import {
  Box,
  Chip,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { I18n } from "../../util/language/I18n";
import { IOUtil } from "../../util/IOUtil";

export const AllDevices = (): JSX.Element => {
  const [devices, setDevices] = useState<deviceData[]>([]);
  const [isloading, setisloading] = useState<boolean>(true);
  const [deviceId, setDeviceId] = useState<string>("");
  const [alias, setAlias] = useState<string>("");
  useEffect(() => {
    const controller = new AbortController();

    setisloading(true);
    AdminUtil.getAllDevices(controller).then((result) => {
      setDevices(result);
      setisloading(false);
    });
    return () => controller.abort();
  }, []);

  return (
    <>
      <Box
        className="flexbox"
        style={{
          margin: "auto",
          justifyContent: "center",
          flexDirection: "column",
          display: "flex",
          backgroundColor: "rgba(0,0,0,0.0)",
          height: "fit-content",
          width: "fit-content",
        }}
      >
        <h2>{I18n.t("allDevices.List")}</h2>
        <TableContainer component={Paper} arial-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{I18n.t("allDevices.tableIndex")}</TableCell>
              <TableCell>{I18n.t("allDevices.tableId")}</TableCell>
              <TableCell>{I18n.t("allDevices.tableAlias")}</TableCell>
              <TableCell>{I18n.t("allDevices.tableUser")}</TableCell>
              <TableCell>{I18n.t("allDevices.fullname")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isloading ? (
              devices.map((device) => (
                <TableRow
                  key={device.index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {device.index}
                  </TableCell>
                  <TableCell align="right">{device.id}</TableCell>
                  <TableCell align="right">
                    {device.alias ? <p>{device.alias}</p> : <p>{I18n.t("allDevices.noAlias")}</p>}
                  </TableCell>
                  <TableCell align="right">
                    {device.owner ? (
                      <p>{device.owner}</p>
                    ) : (
                      <Chip
                        label="assign user"
                        variant="outlined"
                        style={{ backgroundColor:'rgba(0, 170, 20, 255)' }}
                      />
                    )}
                  </TableCell>

                  <TableCell align="right">
                    {device.firstname ? (
                      <p>
                        {device.firstname} {device.lastname}
                      </p>
                    ) : (
                      <p>{I18n.t("allDevices.noUser")}</p>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={I18n.t("allDevices.tableChipRemove")}
                      variant="outlined"
                      style={{backgroundColor:'rgba(210,18,25,255)' }}
                      onClick={(event) =>
                        IOUtil.deleteDevice(device.id)
                      }
                    />
                    </TableCell>
                </TableRow>
              ))
            ) : (
              <CircularProgress/>
            )}
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="left" >
                    <label>{I18n.t("allDevices.tableId")}</label>
                </TableCell>
                <TableCell align="left">
                    <input type="text" value={deviceId} onChange={(e) => setDeviceId(e.target.value)} />
                </TableCell>
                <TableCell align="left">
                    <label>{I18n.t("allDevices.tableAlias")}</label>
                </TableCell>
                <TableCell align="left">
                    <input type="text" value={alias} onChange={(e) => setAlias(e.target.value)} />
                </TableCell>
                <TableCell align="center">
                <Chip
                      label={I18n.t("allDevices.tableChipAdd")}
                      variant="outlined"
                      style={{backgroundColor:'rgba(25, 118, 210, 255)' }}
                      onClick={(event) => {
                        IOUtil.addDevice(deviceId, alias)
                    }
                    }
                    />
                </TableCell>
            </TableRow>
          </TableBody>
        </TableContainer>
      </Box>
    </>
  );
};
