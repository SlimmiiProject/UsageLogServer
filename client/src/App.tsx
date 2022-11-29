import React, { SetStateAction, useEffect, useState } from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Profile from "./components/users/Profile";
import Register from "./components/users/Register";
import Devices from "./components/users/Devices";
import Logout from "./components/users/Logout";
import Drawer from "./components/DrawerComponent";
import Contact from "./components/Contact";
import PageNotFound from "./components/404";
import DashboardComp from "./components/dashboard/Dashboard";
import { AdminPage } from "./components/admin/AdminPage";
import LoginPage from "./components/users/LoginPage";
import { I18n } from "./util/language/I18n";
import EditProfile from "./components/users/EditProfile";
import { Routes, Route, Navigate, Location } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { IOUtil } from "./util/IOUtil";
import { getLanguageFromUrl } from "./util/BrowserUtil";
import { url } from "inspector";
import { LogFile } from "./components/admin/LogFile";
import SignIn from "./components/users/SignIn";
import { AllUsers } from "./components/admin/AllUsers";

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

export interface AccountData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

interface IUserContext {
  userAccount?: AccountData;
  isLoggedIn: boolean;
  isAdmin: boolean;
  setAccountData: React.Dispatch<SetStateAction<AccountData | undefined>>;
  logout: () => void;
}

export const userContext = React.createContext<IUserContext>({
  isLoggedIn: false,
  isAdmin: false,
  setAccountData: (data) => {},
  logout: () => {},
});

// Get the current path to use for the correct links
export const getCurrentPath = (location: Location) => {
  if (location.pathname[location.pathname.length - 1] === "/")
    location.pathname = location.pathname.substring(
      0,
      location.pathname.length - 1
    );
  return location.pathname;
};

// Get path with current language prefix
export const getPath = (path: string) => {
  return `/${I18n.currentLanguage}/${path}`;
};

const App = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [accountData, setAccountData] = useState<AccountData | undefined>(
    undefined
  );
  const [darkMode, setDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem("darkMode")!) || false
  );

  useEffect(() => {
    // Change Language, in case it's different to what's currently selected
    const urlLang = getLanguageFromUrl();
    if (I18n.currentLanguage != urlLang) I18n.changeLanguage(urlLang)

    const controller = new AbortController();

    IOUtil.getSessionData(controller).then((res) => {
      setAccountData((_accountData) => res);
      setLoading(false);
    });

    IOUtil.isAdmin(controller).then(res => {
      setAccountData((accountData) => {
        return { ...accountData!, isAdmin: res };
      });
    });

    return () => controller.abort();
  }, [])

  const lang = I18n.currentLanguage;

  // Change darkmode
  const darkTheme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
  });

  const handleDarkMode = () =>
    setDarkMode((prevDarkMode) => {
      const afterToggle = !prevDarkMode;
      localStorage.setItem("darkMode", JSON.stringify(afterToggle));
      return afterToggle;
    });

  return (
    <>
      {!loading && (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <userContext.Provider
            value={{
              isLoggedIn: accountData != undefined,
              isAdmin: accountData != undefined && accountData.isAdmin,
              userAccount: accountData,
              setAccountData: setAccountData,
              logout: () => setAccountData(undefined),
            }}
          >
            <Drawer lang={lang} onDarkmode={handleDarkMode} mode={darkMode} />
            <Routes>
              <Route path="/" element={<Navigate to={getPath("")} />} />
              <Route
                path="/dashboard"
                element={<Navigate to={getPath("dashboard")} />}
              />

              <Route path="/:lang">
                <Route index element={<LoginPage />} />
                <Route path="dashboard" element={<DashboardComp />} />

                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<Register />} />
                <Route path="logout" element={<Logout />} />

                <Route path="profile" element={<Profile />} />
                <Route path="profile/edit-profile" element={<EditProfile />} />

                <Route path="devices" element={<Devices />} />
                <Route path="contact" element={<Contact />} />

                <Route path="admin">
                  <Route index element={<AdminPage />} />
                  <Route path="allusers" element={<AllUsers />} />
                  <Route path="alldevices" element={<AdminPage />} />
                  <Route path="logfile" element={<LogFile />} />
                </Route>
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </userContext.Provider>
        </ThemeProvider>
      )}
    </>
  );
};

export default App;
