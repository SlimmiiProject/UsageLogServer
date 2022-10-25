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
import EditProfile from "./components/EditProfile";

export interface Idata {
  name: string;
  dag: number;
  nacht: number;
}

const App = (): JSX.Element => {
  let { i18n } = useTranslation();
  console.log(i18n);

  let lang = i18n.resolvedLanguage;

  if (lang === undefined) {
    lang = "en";
  }

  let indexNavigate = `/${lang}/`;

  const data1 = [
    {
      name: "Page A",
      dag: 4000,
      nacht: 2400,
    },
    {
      name: "Page B",
      dag: -3000,
      nacht: 1398,
    },
    {
      name: "Page C",
      dag: -2000,
      nacht: -3000,
    },
    {
      name: "Page D",
      dag: 2780,
      nacht: 3908,
    },
    {
      name: "Page E",
      dag: -1890,
      nacht: 4800,
    },
    {
      name: "Page F",
      dag: 2390,
      nacht: -3800,
    },
    {
      name: "Page G",
      dag: 3490,
      nacht: 4300,
    },
  ];
  const data2 = [
    {
      name: "Dinsdag",
      dag: 500,
      nacht: 20,
    },
    {
      name: "Woensdag",
      dag: 200,
      nacht: -10,
    },
    {
      name: "Donderdag",
      dag: 5000,
      nacht: 360,
    },
    {
      name: "Vrijdag",
      dag: 2500,
      nacht: 2500,
    },
    {
      name: "Zaterdag",
      dag: -150,
      nacht: 28,
    },
    {
      name: "Zondag",
      dag: 248,
      nacht: -36,
    },
    {
      name: "Maandag",
      dag: 898,
      nacht: 247,
    },
  ];
  const combineddata = require("./util/data/testData.json");
  return (
    <>
      <Drawer lang={lang} />
      <Routes>
        <Route path="/" element={<Navigate to={indexNavigate} />} />
        <Route path="/:lang">
          <Route index element={<HomePage />} />
          <Route
            path="dashboard"
            element={<DashboardComp data={combineddata} />}
          />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit-profile" element={<EditProfile />} />
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
