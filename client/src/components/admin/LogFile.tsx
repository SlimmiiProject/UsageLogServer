import { I18n } from "../../util/language/I18n";
import { AdminUtil, LogData } from "../../util/AdminUtil";
import { useEffect, useState } from "react";
import { Box, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";

export const LogFile = (): JSX.Element => {
  const [files, setFiles] = useState<LogData[]>([]);
  const [isloading, setisloading] = useState<boolean>(true);
 
  useEffect(() => {
    const controller = new AbortController();

    setisloading(true);
    AdminUtil.getLogs(controller, 0).then((result) => {
      setFiles(result.data)
      setisloading(false);
    });
    return () => controller.abort();

  }, [])

  return (
    <>
    <Box className="flexbox" style={{margin:"auto", justifyContent:"center",flexDirection:"column", display:"flex", alignItems:"center" , width:"70%",height:"fit-content", backgroundColor:"rgba(0,0,0,0.0)"}}>
    <h2>{I18n.t("logger.title")}</h2>
    <TableContainer component={Paper}>
      <Table sx={{minwidth:650}} arial-label="simple table">
        <TableHead>
          <TableCell>{I18n.t("logFile.id")}</TableCell>
          <TableCell>{I18n.t("logFile.account")}</TableCell>
          <TableCell>{I18n.t("logFile.description")}</TableCell>
          <TableCell>{I18n.t("logFile.IP")}</TableCell>
          <TableCell>{I18n.t("logFile.date")}</TableCell>
        </TableHead>

        <TableBody>
          {!isloading ? (
            files.map((file)=>(
    <TableRow key={file.id} sx={{'&:last-child td, &:last-child th':{border:0}}}>
        <TableCell component="th" scope="row"> {file.id}</TableCell>
        <TableCell align="center">{file.account_id}</TableCell>
        <TableCell align="left" >{file.description}</TableCell>
        <TableCell align="center">{file.ipaddress}</TableCell>
        <TableCell align="center">{new Date(file.date).toDateString()}</TableCell>
        </TableRow>
            ))
          ):( <section className="graph" style={{borderWidth:0,alignItems:"center",justifyItems:"center",justifyContent:"center",display:"flex"}}><CircularProgress className="circularprogress"/></section>)}
        </TableBody>
      </Table>
    </TableContainer>
    <Box className="marginFix" sx={{minHeight:"2rem"}}/>
    </Box>
    </>
  );
};
