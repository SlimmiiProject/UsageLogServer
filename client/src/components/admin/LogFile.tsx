import { I18n } from "../../util/language/I18n";
import { AdminUtil, LogData } from "../../util/AdminUtil";
import { useEffect, useState } from "react";
import { Box, List, ListItem, Typography, Chip, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

export const LogFile = (): JSX.Element => {
  const [files, setFiles] = useState<LogData[]>([]);
  const [isloading, setisloading] = useState<boolean>(true);
 
  useEffect(() => {
    const controller = new AbortController();

    setisloading(true);
    AdminUtil.getLogs(controller).then((result) => {
      setFiles(result)
      setisloading(false);
    });
    return () => controller.abort();

  }, [])

  return (
    <>
    <Box className="flexbox" style={{margin:"auto", justifyContent:"center",flexDirection:"column", display:"flex", alignItems:"center" , borderWidth:3,borderColor:"grey",borderRadius:15, width:"70%",height:"fit-content", backgroundColor:"rgba(0,0,0,0.0)"}}>
    <h2>{I18n.t("logger.title")}</h2>
    <TableContainer component={Paper}>
      <Table sx={{minwidth:650}} arial-label="simple table">
        <TableHead>
          <TableCell>Id</TableCell>
          <TableCell>Account</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>IP</TableCell>
          <TableCell>Date</TableCell>
        </TableHead>

        <TableBody>
          {!isloading ? (
            files.map((file)=>(
    <TableRow key={file.id} sx={{'&:last-child td, &:last-child th':{border:0}}}>
        <TableCell component="th" scope="row"> {file.id}</TableCell>
        <TableCell align="left">{file.account_id}</TableCell>
        <TableCell align="left" >{file.description}</TableCell>
        <TableCell align="left">{file.ipaddress}</TableCell>
        <TableCell align="left">{new Date(file.date).toDateString()}</TableCell>
        </TableRow>
            ))
          ): <h2>Loading...</h2>}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </>
  );
};
