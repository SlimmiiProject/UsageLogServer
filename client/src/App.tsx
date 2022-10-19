import React, { useEffect, useState } from "react";

import Profile from "./components/Profile";
import {
  Route,
  Routes,
  NavLink,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom";
import Register from "./components/Register";
import Devices from "./components/Devices";
import SignIn from "./components/SignIn";
import Drawer from "./components/DrawerComponent";
import Contact from "./components/Contact";
import PageNotFound from "./components/404";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import DashboardComp from "./components/Dashboard";
import { AdminPage } from "./components/AdminPage";
import { useTranslation } from "react-i18next";
import LoginPage from "./components/LoginPage";

export interface ItestData {
  devices: Idevice[];
}
export interface Idevice {
  nameDevice: string;
  data: Idata[];
  colorDay: string;
  colorNight: string;
}
export interface Idata {
  name: string;
  dag: number;
  nacht: number;
}

export const getCurrentPath = (location: any) => {
  if (location.pathname[location.pathname.length - 1] === "/") {
    location.pathname = location.pathname.substring(
      0,
      location.pathname.length - 1
    );
  }
  return location.pathname;
};

export const getCurrentLanguage = (translation: any) => {
  let { i18n } = translation;
  // get language from language selector
  return i18n.resolvedLanguage;
};
export const getCurrentLanguagePath = (lang: string) => {
  // Set default language to en (English)
  if (lang === undefined) {
    lang = "en";
  }
  return `/${lang}/`;
};

const App = (): JSX.Element => {
  const [loggedIn, setLoggedIn] = useState<boolean>();
  const indexNavigate = getCurrentLanguagePath(
    getCurrentLanguage(useTranslation())
  );
  const lang = getCurrentLanguage(useTranslation());
  // Add testdata from file to emulate externaldata
  const combineddata: ItestData = require("./util/data/testData.json");
  return (
    <>
      <Drawer lang={lang} />
      <Routes>
        <Route path="/" element={<Navigate to={indexNavigate} />} />
        <Route path="/:lang">
          <Route
            index
            element={
              loggedIn ? (
                <Navigate to={indexNavigate + "dashboard"} />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="dashboard"
            element={<DashboardComp data={combineddata} />}
          />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile-change-data" element={<Contact />} />
          <Route path="devices" element={<Devices />} />
          <Route path="login" element={<SignIn />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<AdminPage />}>
            <Route path="allusers" element={<AdminPage />} />
            <Route path="alldevices" element={<AdminPage />} />
            <Route path="logfile" element={<AdminPage />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
