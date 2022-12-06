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
import DashboardComp from "./components/dashboard/Dashboard";
import { AdminPage } from "./components/admin/AdminPage";
import LoginPage from "./components/users/LoginPage";
import { I18n } from "./util/language/I18n";
import EditProfile from "./components/users/EditProfile";
import { Routes, Route, Navigate } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { IOUtil } from "./util/IOUtil";
import { getFullPath, getLanguageFromUrl } from "./util/BrowserUtil";
import { LogFile } from "./components/admin/LogFile";
import { AllUsers } from "./components/admin/AllUsers";
import { AllDevices } from "./components/admin/AllDevices";
import ForgotPassword from "./components/users/ForgotPassword";

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
    if (I18n.currentLanguage != urlLang) I18n.changeLanguage(urlLang);

    const controller = new AbortController();

    const fetchLoginData = async () => {
      const accountData = await IOUtil.getSessionData(controller);
      setAccountData((_accoundData) => accountData);

      if (accountData) {
        const isAdmin = await IOUtil.isAdmin(controller);
        setAccountData((accountData) => {
          return { ...accountData!, isAdmin: isAdmin };
        });
      }

      setLoading(false);
    };

    fetchLoginData();

    return () => controller.abort();
  }, []);

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

  const loggedIn = accountData !== undefined;

  console.log(accountData?.isAdmin);

  return (
    <>
      {!loading && (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <userContext.Provider
            value={{
              isLoggedIn: loggedIn,
              isAdmin: loggedIn && accountData.isAdmin,
              userAccount: accountData,
              setAccountData: setAccountData,
              logout: () => setAccountData(undefined),
            }}
          >
            <Drawer lang={lang} onDarkmode={handleDarkMode} mode={darkMode} />
            <Routes>
              <Route path="/" element={<Navigate to={getPath("")} />} />
              <Route
                path="/forgot-password"
                element={<Navigate to={getPath(getFullPath())} />}
              />
              <Route
                path="/forgot-password"
                element={<Navigate to={getPath(getFullPath())} />}
              />
              <Route
                path="/dashboard"
                element={<Navigate to={getPath("dashboard")} />}
              />

              <Route path="/:lang">
                <Route
                  index
                  element={
                    !loggedIn ? (
                      <Navigate to={getPath("login")} />
                    ) : (
                      <Navigate to={getPath("dashboard")} />
                    )
                  }
                />
                <Route path="contact" element={<Contact />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />

                {loggedIn ? (
                  <>
                    <Route path="dashboard" element={<DashboardComp />} />
                    <Route path="logout" element={<Logout />} />

                    <Route path="profile" element={<Profile />} />
                    <Route
                      path="profile/edit-profile"
                      element={<EditProfile />}
                    />

                    <Route path="devices" element={<Devices />} />

                    {accountData.isAdmin && (
                      <>
                        <Route path="admin">
                          <Route index element={<AdminPage />} />
                          <Route path="allusers" element={<AllUsers />} />
                          <Route path="alldevices" element={<AllDevices />} />
                          <Route path="logfile" element={<LogFile />} />
                        </Route>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Route path="login" element={<LoginPage />} />
                  </>
                )}
              </Route>
              <Route path="*" element={<Navigate to={getPath("/")} />} />
            </Routes>
          </userContext.Provider>
        </ThemeProvider>
      )}
    </>
  );
};

export default App;
