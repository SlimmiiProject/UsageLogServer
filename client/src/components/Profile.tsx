import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { I18n } from "../util/language/I18n";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Profile = (): JSX.Element => {
  let fullName = "Raven Van Hove";
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  function stringAvatar(name: string, width: number = 60, height: number = 60) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        height: height,
        width: width,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return (
    <>
      <div className="box">
        <h1>Profiel</h1>
        <div className="flex">
          <Avatar {...stringAvatar(fullName)} />
          <h2>{fullName}</h2>
          <Link to="./edit-profile">
            <Button
            variant="contained"
          >{I18n.t("profile.edit")}
          </Button></Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
