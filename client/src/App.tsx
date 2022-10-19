import React, { useEffect, useState } from "react";

import Profile from "./components/Profile";
import { Route, Routes, NavLink, useParams, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
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

const App = (): JSX.Element => {
  let { i18n } = useTranslation();
  let lang = i18n.resolvedLanguage;

  // Add testdata from file to emulate externaldata
  const combineddata: ItestData = require("./util/data/testData.json");

  return (
    <>
      <Drawer lang={lang} />
      <Routes>
        <Route path="/" element={<Navigate to={`/${lang}/`} />} />
        <Route path="/:lang" >
          <Route index element={<HomePage />} />
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
