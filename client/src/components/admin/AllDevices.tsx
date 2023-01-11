import { AdminUtil, deviceData, deviceResponseData, userData, userResponseData } from "../../util/AdminUtil";
import { useState, useEffect } from "react";
import {
    Box,
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
    Pagination,
    Stack,
    DialogActions,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { I18n } from "../../util/language/I18n";
import { IOUtil } from "../../util/IOUtil";
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonIcon from '@mui/icons-material/Person';
export interface dialogstate {
    open: boolean,
    device: string,
    user?: number,
    assign: (deviceid: string, userid: number) => void,
    setopen: (deviceid: string) => void;

}
export const AllDevices = (): JSX.Element => {
    const [devices, setDevices] = useState<deviceData[]>([]);
    const [users, setUsers] = useState<userData[]>([]);
    const [open, setOpen] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<userData>()
    const [clickedDevice, setClickedDevice] = useState<string>("");
    const [isloading, setisloading] = useState<boolean>(true);
    const [deviceId, setDeviceId] = useState<string>("");
    const [alias, setAlias] = useState<string>("");
    const [pages, setPages] = useState<number>(10);
    const [page, setPage] = useState<number>(1)
    useEffect(() => {
        const controller = new AbortController();
        setisloading(true);
        requestAllDevices(controller)
        requestAllUsers(controller)
        setisloading(false);
        return () => controller.abort();
    }, [isloading]);
    useEffect(() => {
        const controller = new AbortController();
        requestAllDevices(controller)
        return () => controller.abort();
    }, [page])
    const handleClickClosed = () => {
        setOpen(false)
    }
    const handleClickOpen = (deviceid: string) => {
        setClickedDevice(deviceid)
        setOpen(true)
    }
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page)
    }
    const requestAllDevices = (controller: AbortController) => {
        AdminUtil.getAllDevices(controller, page - 1).then((result: deviceResponseData) => {
            setDevices(result.data);
            setPages(result.pages)
        });
    }
    const requestAllUsers = (controller: AbortController) => {
        AdminUtil.getAllUsers(controller).then((result: userResponseData) => {
            setUsers(result.data)
        });
    }
    const handleSelect = (event: SelectChangeEvent) => {
        const temp = users.filter((a) => a.userId.toString() == event.target.value);
        setSelectedUser(temp[0]);
    }
    const handleSave = () => {
        if (selectedUser && clickedDevice) {
            AdminUtil.addDeviceToUser(selectedUser.userId, clickedDevice).then(() => {
                const controller = new AbortController();
                requestAllDevices(controller);
            });
        }


        handleClickClosed()
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
                }}>
                <h2>{I18n.t("allDevices.List")}</h2>
                <TableContainer component={Paper} arial-label="simple table" sx={{ margin: "auto" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">{I18n.t("allDevices.tableIndex")}</TableCell>
                            <TableCell align="left">{I18n.t("allDevices.tableId")}</TableCell>
                            <TableCell align="left">{I18n.t("allDevices.tableAlias")}</TableCell>
                            <TableCell align="left">{I18n.t("allDevices.tableUser")}</TableCell>
                            <TableCell align="left">{I18n.t("allDevices.fullname")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!isloading ? (
                            devices.map((device, index) => (
                                <TableRow
                                    key={device.index}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell align="left" component="th" scope="row">
                                        {device.index}
                                    </TableCell>
                                    <TableCell  align="left">{device.id}</TableCell>
                                    <TableCell  align="left">
                                        {device.alias ? <p>{device.alias}</p> : <p>{I18n.t("allDevices.noAlias")}</p>}
                                    </TableCell>
                                    <TableCell  align="left">
                                        {device.owner ? (
                                            <p>{device.owner}</p>
                                        ) : (<>
                                            <Button startIcon={<PersonIcon />} onClick={() => handleClickOpen(device.id)}>
                                              {I18n.t("allDevices.assignUser")}
                                            </Button>
                                        </>
                                        )}
                                    </TableCell>
                                    <TableCell align="left">
                                        {device.firstname ? (
                                            <p>
                                                {device.firstname} {device.lastname}
                                            </p>
                                        ) : (
                                            <p>{I18n.t("allDevices.noUser")}</p>
                                        )}
                                    </TableCell>
                                    <TableCell  align="left">
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={(event) =>
                                                IOUtil.deleteDevice(device.id)
                                            }
                                        >
                                            {I18n.t("allDevices.tableChipRemove")}
                                        </Button>
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
                                <TextField type="text" value={deviceId} onChange={(e) => setDeviceId(e.target.value)} />
                            </TableCell>
                            <TableCell align="left">
                                <label>{I18n.t("allDevices.tableAlias")}</label>
                            </TableCell>
                            <TableCell align="left">
                                <TextField type="text" value={alias} onChange={(e) => setAlias(e.target.value)} />
                            </TableCell>
                            <TableCell align="center">
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    startIcon={<AddBoxIcon />}
                                    onClick={(event) => { IOUtil.addDevice(deviceId, alias) }}
                                >{I18n.t("allDevices.tableChipAdd")}</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </TableContainer>
                <Dialog open={open} onClose={handleClickClosed} maxWidth="lg">
                    <DialogTitle>{I18n.t("allDevices.assignUserDialog")}</DialogTitle>
                    <DialogContent>
                        <FormControl>
                            <InputLabel id="select-user-label">{I18n.t("allDevices.assignUserButton")}</InputLabel>
                            <Select
                                labelId="select-user-label"
                                multiple={false}
                                label="User"
                                value={selectedUser ? `${selectedUser.userId}` : ''}
                                onChange={(e) => handleSelect(e)}
                                sx={{ maxHeight: 48 * 4.5 + 8, width: 250 }}
                                input={<OutlinedInput label="User" />}
                            >
                                {
                                    users.map((u) => (<MenuItem
                                        key={u.userId}
                                        value={u.userId}
                                    >
                                        {u.userId} - {u.firstname} {u.lastname}
                                    </MenuItem>

                                    ))
                                }
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickClosed} color="error" variant="outlined">{I18n.t("metercard.cancel")}</Button>
                        <Button onClick={handleSave} color="success" variant="outlined">{I18n.t("metercard.save")}</Button>
                    </DialogActions>
                </Dialog>
                <Box sx={{ width: "100%", marginTop: "1rem", display: "flex", justifyContent: "center" }}>
                    <Stack spacing={2}>
                        <Pagination
                            count={pages}
                            color="secondary"
                            size="large"
                            showFirstButton
                            showLastButton
                            defaultPage={1}
                            boundaryCount={15}
                            onChange={handlePageChange}
                        />
                    </Stack>
                </Box>
                <Box className="marginFix" sx={{ minHeight: "2rem" }} />

            </Box>
        </>
    );
};