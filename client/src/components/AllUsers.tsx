import React from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export const AllUsers = (): JSX.Element => {
  return (
    <>
      <div className="flexbox">
        <AccountCircleRoundedIcon />
        <h2>Overzicht van alle Users</h2>
      </div>
    </>
  );
};
