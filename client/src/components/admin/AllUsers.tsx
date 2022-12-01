import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import {
  Box,
  List,
  ListItem,
  Typography,
  Chip,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { AdminUtil, GraphColors, userData } from "../../util/AdminUtil";
import { I18n } from "../../util/language/I18n";
import React, { Component } from "react";
import { IOUtil } from "../../util/IOUtil";
export const AllUsers = (): JSX.Element => {
  const [users, setusers] = useState<userData[]>([]);
  const [isloading, setisloading] = useState<boolean>(true);
  const [render, setRender] = useState<boolean>(false);
  useEffect(() => {
    const controller = new AbortController();
    //<TableCell align="right">{user.device.map((device)=>(<p>{device}</p>))}</TableCell>

    setisloading(true);
    AdminUtil.getUsers(controller).then((result) => {
      //setusers([{userId:1,firstname:"Kasper",lastname:'Bosteels',email:"Kasperbosteels@hotmail.com",device:[1,2,3,4,5,6],colorDay:GraphColors.RED,colorNight:GraphColors.BLUE,isAdmin:true}]);
      setusers(result);
      setisloading(false);
    });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setRender(false);
  }, [render])

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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} arial-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{I18n.t("allUsers.tableId")}</TableCell>
                <TableCell>{I18n.t("allUsers.tableEmail")}</TableCell>
                <TableCell>{I18n.t("allUsers.tableName")}</TableCell>
                <TableCell>{I18n.t("allUsers.tablePhone")}</TableCell>
                <TableCell>
                  {I18n.t("allUsers.tableColors")} \(
                  {I18n.t("allUsers.tableColorsDay")},{" "}
                  {I18n.t("allUsers.tableColorsNight")}\)
                </TableCell>
                <TableCell>{I18n.t("allUsers.tableAdmin")}</TableCell>
                <TableCell>{I18n.t("allUsers.tableDevices")}</TableCell>
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
                          style={{ backgroundColor: "red" }}
                          onClick={(event) => {
                            AdminUtil.deleteAdmin(user.userId).then((event)=>{
                              user.isAdmin = false;
                              setRender(true);
                            });
                          }}
                        />
                      ) : (
                        <Chip
                          label={I18n.t("allUsers.tableChipMakeAdmin")}
                          variant="outlined"
                          style={{ backgroundColor: "blue" }}
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
                        style={{ backgroundColor: "red" }}
                        onClick={(event) => {
                          IOUtil.deleteUser(user.userId).then((event)=>{
                            setusers((users) => users.filter(u => u.userId !== user.userId))
                            setRender(true);
                          }) 
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <h2>{I18n.t("allUsers.loading")}</h2>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
