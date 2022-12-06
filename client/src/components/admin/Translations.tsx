import { I18n } from "../../util/language/I18n";
import { AdminUtil, TranslationData, } from "../../util/AdminUtil";
import { useEffect, useState } from "react";
import { Box, Chip, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";

export const Translations = (): JSX.Element => {
  const [files, setFiles] = useState<TranslationData[]>([]);
  const [isloading, setisloading] = useState<boolean>(true);
 
  useEffect(() => {
    const controller = new AbortController();

    setisloading(true);
    AdminUtil.getTranslation(controller).then((result) => {
      setFiles(result)
      setisloading(false);
    });
    return () => controller.abort();

  }, [])

  const fakeData = [
    {
        nl:"ja",
        de:"JA!",
        en:"yes",

    },
    {
        nl:"nee",
        de:"NEIN!",
        en:"no"
    }
  ]
  return (
    <>
    <Box className="flexbox" style={{margin:"auto", justifyContent:"center",flexDirection:"column", display:"flex", alignItems:"center" , borderWidth:0,borderColor:"grey",borderRadius:15, width:"70%",height:"fit-content", backgroundColor:"rgba(0,0,0,0.0)"}}>
    <h2>{I18n.t("translations.title")}</h2>
    <TableContainer component={Paper}>
      <Table sx={{minwidth:650}} arial-label="simple table">
        <TableHead>
          <TableCell>{I18n.t("translations.word")}</TableCell>
          <TableCell>{I18n.t("translations.change")}</TableCell>
        </TableHead>

        <TableBody>
        {!isloading ? (
            fakeData.map((data)=>(
                <TableRow>
                    <TableCell>English: {data.en}<br></br>Nederlands: {data.nl}<br></br>Deutsch: {data.de}</TableCell>
                    <TableCell><Chip label="change Translation" variant="outlined" style={{backgroundColor:"rgba(0, 170, 20, 255)"}}/></TableCell>
                </TableRow>
            ))
        ): ( <section className="graph" style={{borderWidth:0,alignItems:"center",justifyItems:"center",justifyContent:"center",display:"flex"}}><CircularProgress className="circularprogress"/></section>)}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </>
  );
};
