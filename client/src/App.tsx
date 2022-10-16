import React, { useEffect, useState } from "react";
import Profile from "./components/Profile";
import AddSensor from "./components/AddSensor";
import { I18n, languages } from "./util/language/I18n";
import { LanguageSelector } from "./components/LanguageSelector";
import { Route, Routes, NavLink, useParams } from "react-router-dom";
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

const App = (): JSX.Element => {
  let { lang } = useParams();
  if (lang === undefined) {
    lang = "en";
  }
  return (
    <>
      <Drawer lang={lang} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:lang">
          <Route path="dashboard" element={<DashboardComp />} />
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
