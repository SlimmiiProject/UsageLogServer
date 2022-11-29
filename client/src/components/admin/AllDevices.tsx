import { AdminUtil, deviceData } from "../../util/AdminUtil";
import {useState, useEffect} from "react";
import { Box, List, ListItem, Typography, Chip, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { I18n } from "../../util/language/I18n";


export const AllDevices = ():JSX.Element  =>{
    const [devices,setDevices] = useState<deviceData[]>([])
    const [isloading, setisloading] = useState<boolean>(true);
    useEffect(() => {
      const controller = new AbortController();

      setisloading(true)
        AdminUtil.getAllDevices(controller).then((result)=>{
            setDevices(result);
            setisloading(false);
        });
      return () => controller.abort();
    },[])
    
    

return (
<>
<Box
className="flexbox"
style={{
    margin:"auto",
    justifyContent:"center",
    flexDirection: "column",
    display:"flex",
    backgroundColor:"rgba(0,0,0,0.0)",
    height:"fit-content",
    width:"fit-content"
}}>
    <h2>{I18n.t("allDevices.List")}</h2>
    <TableContainer component={Paper} arial-label="simple table">
    <TableHead>
        <TableRow>
            <TableCell>{I18n.t("allDevices.tableIndex")}</TableCell>
            <TableCell>{I18n.t("allDevices.tableId")}</TableCell>
            <TableCell>{I18n.t("allDevices.tableAlias")}</TableCell>
            <TableCell>{I18n.t("allDevices.tableUser")}</TableCell>

        </TableRow>
    </TableHead>
    <TableBody>
    {!isloading ? (
    devices.map((device)=>(
        <TableRow key={device.index} sx={{'&:last-child td, &:last-child th':{border:0}}}>
            <TableCell component="th" scope="row">{device.index}</TableCell>
            <TableCell align="right">{device.id}</TableCell>
            <TableCell align="right">{device.alias ? (<p>{device.alias}</p>) : (<p>no alias</p>)}</TableCell>
            <TableCell align="right">{device.owner ? (<p>{device.owner}</p>) : (<Chip label="assign user" variant="outlined" style={{backgroundColor:"green"}}/>)}</TableCell>

            <TableCell align="right">{device.firstname ? (<p>{device.firstname} {device.lastname}</p>) : (<p> No user</p>)}</TableCell>
            <TableCell align="right"><Chip label={I18n.t("allDevices.tableChipRemove")} variant="outlined" style={{backgroundColor:"red"}}/></TableCell>
        </TableRow>
    ))
    ) : (<h2>{I18n.t("allDevices.loading")}</h2>)}
    </TableBody>
    </TableContainer>


</Box>
</>);
}