import { I18n } from "../../util/language/I18n";
import { AdminUtil, LogData } from "../../util/AdminUtil";
import { useEffect, useState } from "react";
import { Box, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";
export interface response {
  data:contactdata[],
}
export interface contactdata{
contactId: number
created_at: string
email: string,
firstname: string
lastname: string
message: string
message_topic: string
}
export const Forms = (): JSX.Element => {
  const [files, setFiles] = useState<contactdata[]>([]);
  const [isloading, setisloading] = useState<boolean>(true);
 
  useEffect(() => {
    const controller = new AbortController();

    setisloading(true);
    AdminUtil.getContactData().then((result:any) => {
     console.log(result)
     setFiles(result)
     setisloading(false)
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
    <TableRow key={file.contactId.toString()} sx={{'&:last-child td, &:last-child th':{border:0}}}>
        <TableCell component="th" scope="row"> {file.contactId}</TableCell>
        <TableCell align="left">{file.created_at}</TableCell>
        <TableCell align="left" >{file.email}</TableCell>
        <TableCell align="left">{file.firstname} {file.lastname}</TableCell>
        <TableCell align="left">{file.created_at}</TableCell>
        <TableCell align="left">{file.message_topic}</TableCell>
        <TableCell align="left">{file.message}</TableCell>
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