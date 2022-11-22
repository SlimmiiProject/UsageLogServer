import React, { useState } from "react";

import Profile from "./components/users/Profile";
import Register from "./components/users/Register";
import Devices from "./components/users/Devices";
import Logout from "./components/users/Logout";
import Drawer from "./components/DrawerComponent";
import Contact from "./components/Contact";
import PageNotFound from "./components/404";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import DashboardComp from "./components/dashboard/Dashboard";
import { AdminPage } from "./components/admin/AdminPage";
import LoginPage from "./components/users/LoginPage";
import { I18n } from "./util/language/I18n";
import EditProfile from "./components/users/EditProfile";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";

export interface ITestData {
  devices: IDevice[];
}

export interface IDevice {
  nameDevice: string;
  data: IData[];
  colorDay: string;
  colorNight: string;
}

export interface IData {
  name: string;
  dag: number;
  nacht: number;
}

interface IuserContext {
  loggedIn: boolean;
  isAdmin: boolean;
  userId: string;
}

interface ISetUserContext {
  setLoggedIn: (loggedIn: boolean) => void;
  setAdmin: (isAdmin: boolean) => void;
}

export const userContext = React.createContext<IuserContext>({
  loggedIn: false,
  isAdmin: false,
  userId: "",
});

export const setUserContext = React.createContext<ISetUserContext>({
  setLoggedIn: (loggedIn: boolean) => {},
  setAdmin: (isAdmin: boolean) => {},
});
// get the current path to use for the correct links
export const getCurrentPath = (location: any) => {
  if (location.pathname[location.pathname.length - 1] === "/")
    location.pathname = location.pathname.substring(
      0,
      location.pathname.length - 1
    );
  return location.pathname;
};

export const getPath = (path: string) => {
  return `/${I18n.currentLanguage}/${path}`;
};

const App = (): JSX.Element => {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [data, setData] = useState();

  const lang = I18n.currentLanguage;

  // Add testdata from file to emulate externaldata
  const combineddata: ITestData = require("./util/data/testData.json");

  // Change darkmode
  const darkModeChoice = darkMode ? "dark" : "light";
  const darkTheme = createTheme({
    palette: {
      mode: darkModeChoice,
    },
  });
  const handleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <userContext.Provider
          value={{
            loggedIn: loggedIn,
            isAdmin: isAdmin,
            userId: userId,
          }}
        >
          <Drawer lang={lang} onDarkmode={handleDarkMode} mode={darkMode} />
          <Routes>
            <Route path="/" element={<Navigate to={`/${lang}/`} />} />
            <Route
              path="/dashboard"
              element={<Navigate to={`/${lang}/dashboard`} />}
            />
            <Route path="/:lang">
              <Route index element={<LoginPage />} />
              <Route
                path="dashboard"
                element={<DashboardComp data={combineddata} />}
              />
              {/* <setUserContext.Provider
                value={{
                  setLoggedIn: setLoggedIn,
                  setAdmin: setIsAdmin,
                }}
              > */}
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<Register />} />
              <Route path="logout" element={<Logout />} />
              {/* </setUserContext.Provider> */}
              <Route path="profile" element={<Profile />} />
              <Route path="profile/edit-profile" element={<EditProfile />} />
              <Route path="devices" element={<Devices />} />
              <Route path="contact" element={<Contact />} />
              <Route path="admin" element={<AdminPage />}>
                <Route path="allusers" element={<AdminPage />} />
                <Route path="alldevices" element={<AdminPage />} />
                <Route path="logfile" element={<AdminPage />} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </userContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
