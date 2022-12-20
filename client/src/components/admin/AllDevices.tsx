import { AdminUtil, deviceData, userData } from "../../util/AdminUtil";
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
  Button,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
} from "@mui/material";
import { I18n } from "../../util/language/I18n";
import { IOUtil } from "../../util/IOUtil";

export interface dialogstate {
  open: boolean,
  device: string,
  user?: number,
  assign: (deviceid: string, userid: number) => void,
  setopen: (deviceid: string) => void;

}
export const AllDevices = (): JSX.Element => {
  const [devices, setDevices] = useState<deviceData[]>([]);
  const [_users, setUsers] = useState<userData[]>([]);
  const [dialogs, setDialogs] = useState<dialogstate[]>([])
  const [isloading, setisloading] = useState<boolean>(true);
  const [deviceId, setDeviceId] = useState<string>("");
  const [alias, setAlias] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    let temp: dialogstate[] = [];
    setisloading(true);
    AdminUtil.getAllDevices(controller, 0).then((result) => {
      setDevices(result.data);
      //populate array with objects for states
      result.data.forEach((r:any) => temp.push({
        open: false,
        device: r.id,
        user: r.owner,
        assign: handleClickClosed,
        setopen: handleClickOpen
      }));
      
      setDialogs(temp)
      setisloading(false);
    });
    return () => controller.abort();
  }, []);

  const handleClickClosed = (deviceid: string, userid: number) => {
    console.log("close triggered")
    console.log(deviceid)
    console.log(dialogs.filter((d) => d.device = deviceid))
    dialogs.filter((d) => d.device === deviceid).map((di) => {
      console.log(di)
      di.open = false;
    })
    //TODO: assign user to device
  }
  const handleClickOpen = (deviceid: string) => {
    console.log("open triggered")
    let temp = dialogs;
    console.log(dialogs)
    console.log(temp)
    temp.map((d) => d.device === deviceid ? d.open = true : d.open = false)
    setDialogs(temp)

  }
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
        <TableContainer component={Paper} arial-label="simple table" sx={{ margin: "auto" }}>
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
              devices.map((device, index) => (
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
                    ) : (<>
                      <Button onClick={() => dialogs[index].setopen(device.id)}>
                        Assign user to device
                      </Button>
                      <Dialog open={dialogs[index].open} onClose={() => dialogs[index].assign(device.id, 11)}>
                        <DialogTitle>Assign user to this device</DialogTitle>
                        <TextField autoFocus fullWidth margin="dense" label="user id" type="number" variant="standard" />
                        <DialogContent>
                          <Button>temp stuff i place here, users will be displayed here later on</Button>
                        </DialogContent>
                      </Dialog>
                    </>
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
                      style={{ backgroundColor: 'rgba(210,18,25,255)' }}
                      onClick={(event) =>
                        IOUtil.deleteDevice(device.id)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <section className="graph" style={{ borderWidth: 0, alignItems: "center", justifyItems: "center", justifyContent: "center", display: "flex" }}><CircularProgress className="circularprogress" /></section>
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
                  style={{ backgroundColor: 'rgba(25, 118, 210, 255)' }}
                  onClick={(event) => {
                    IOUtil.addDevice(deviceId, alias)
                  }
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </TableContainer>
        <Box className="marginFix" sx={{ minHeight: "2rem" }} />

      </Box>
    </>
  );
};