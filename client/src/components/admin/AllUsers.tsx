import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Box, List, ListItem, Typography, Chip } from "@mui/material";
import { useState, useEffect } from "react";
import { AdminUtil, GraphColors, userData } from "../../util/AdminUtil";
import { I18n } from "../../util/language/I18n";

export const AllUsers = (): JSX.Element => {
  const [users, setusers] = useState<userData[]>([]);
  const [isloading, setisloading] = useState<boolean>(true);
  useEffect(() => {
    const controller = new AbortController();
    setisloading(true);
    AdminUtil.getUsers(controller).then((result) => {
      //setusers([{userId:1,firstname:"Kasper",lastname:'Bosteels',email:"Kasperbosteels@hotmail.com",device:[1,2,3,4,5,6],colorDay:GraphColors.RED,colorNight:GraphColors.BLUE,isAdmin:true}]);
      setusers(result);
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
        <h2>{I18n.t("allUsers.List")}</h2>

        <List
          sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}
        >
          {!isloading ? (
            users.map((user) => (
              <ListItem alignItems="flex-start">
                <>
                  <div className="ListItemContent">
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      color="text.primary"
                    >
                      <>
                        {I18n.t("allUsers.email")}: {user.email}
                        <br></br>id: {user.userId}
                      </>
                    </Typography>
                    <br></br>
                    {user.isAdmin ? (
                      <Chip
                        label="Admin"
                        variant="outlined"
                        style={{ backgroundColor: "blue" }}
                      />
                    ) : (
                      <></>
                    )}
                    <br></br>
                    {`${I18n.t("allUsers.FullName")} ${user.firstname} ${
                      user.lastname
                    }`}
                    <br></br>
                    {I18n.t("allUsers.graphColors")}: {user.colorDay},{" "}
                    {user.colorNight}
                  </div>
                </>
              </ListItem>
            ))
          ) : (
            <h2>Loading...</h2>
          )}
        </List>
      </Box>
    </>
  );
};
