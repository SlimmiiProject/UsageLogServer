import {
  Box,
  Chip,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Pagination,
  Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { AdminUtil, userData } from "../../util/AdminUtil";
import { I18n } from "../../util/language/I18n";
import { IOUtil } from "../../util/IOUtil";
export const AllUsers = (): JSX.Element => {
  const [users, setusers] = useState<userData[]>([]);
  const [isloading, setisloading] = useState<boolean>(true);
  const [render, setRender] = useState<boolean>(false);
  const [pages,setPages] = useState<number>(10)
  const [page,setPage]=useState<number>(1)
  useEffect(() => {
    const controller = new AbortController();
    requestAllUsers(controller)
    return () => controller.abort();
  }, [page]);

  useEffect(() => {
    setRender(false);
  }, [render])

const handlePageChange=(event:React.ChangeEvent<unknown>,page:number)=>{
  setPage(page)
}
const requestAllUsers = (controller:AbortController)=>{
  setisloading(true);
  AdminUtil.getUsers(controller, page-1).then((result) => {
    setusers(result.data);
    setPages(result.pages)
    setisloading(false);
  });
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
        <h2>{I18n.t("allUsers.List")}</h2>
        <TableContainer component={Paper} style={{ borderWidth: 5, }}>
          <Table sx={{ minWidth: 650 }} arial-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{I18n.t("allUsers.tableId")}</TableCell>
                <TableCell>{I18n.t("allUsers.tableEmail")}</TableCell>
                <TableCell>{I18n.t("allUsers.tableName")}</TableCell>
                <TableCell>{I18n.t("allUsers.tablePhone")}</TableCell>
                <TableCell>
                  {I18n.t("allUsers.tableColors")}(
                  {I18n.t("allUsers.tableColorsDay")},{" "}
                  {I18n.t("allUsers.tableColorsNight")})
                </TableCell>
                <TableCell>{I18n.t("allUsers.tableAdmin")}</TableCell>
                <TableCell><Chip label={I18n.t("allUsers.tableCreateUser")}
                  variant="outlined"
                  style={{ backgroundColor: 'rgba(0, 170, 20, 255)' }}
                  onClick={(event) => {/*create user goes here*/ }} /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isloading ? (
                users.map((user) => (
                  <TableRow
                    key={user.userId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.userId}
                    </TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">
                      {user.firstname} {user.lastname}
                    </TableCell>
                    <TableCell align="right">{user.phone}</TableCell>
                    <TableCell align="right">
                      {user.colorDay}, {user.colorNight}
                    </TableCell>
                    <TableCell align="right">
                      {user.isAdmin ? (
                        <Chip
                          label={I18n.t("allUsers.tableChipRemoveAdmin")}
                          variant="outlined"
                          style={{ backgroundColor: 'rgba(210,18,25,255)', color: "white" }}
                          onClick={(event) => {
                            AdminUtil.deleteAdmin(user.userId).then((event) => {
                              user.isAdmin = false;
                              setRender(true);
                            });
                          }}
                        />
                      ) : (
                        <Chip
                          label={I18n.t("allUsers.tableChipMakeAdmin")}
                          variant="outlined"
                          style={{ backgroundColor: 'rgba(25, 118, 210, 255)', color: "white" }}
                          onClick={(event) => {
                            AdminUtil.createAdmin(user.userId).then((event) => {
                              user.isAdmin = true;
                              setRender(true);
                            });
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={I18n.t("allUsers.tableChipRemoveUser")}
                        variant="outlined"
                        style={{ backgroundColor: 'rgba(210,18,25,255)', color: "white" }}
                        onClick={(event) => {
                          IOUtil.deleteUser(user.userId).then((event) => {
                            setRender(true);
                          requestAllUsers(new AbortController())
                          })
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <section className="graph" style={{ borderWidth: 0, alignItems: "center", justifyItems: "center", justifyContent: "center", display: "flex" }}><CircularProgress className="circularprogress" /></section>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{width:"100%", marginTop:"1rem", display:"flex", justifyContent:"center"}}>
        <Stack spacing={2} sx={{bgColor:"red"}}>
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
        <Box className="marginFix" sx={{minHeight:"2rem"}}/>
      </Box>
    </>
  );
};
