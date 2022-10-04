import React, { useEffect, useState } from "react";
import Profile from "./components/Profile";
import AddSensor from "./components/AddSensor";
import { I18n, languages } from "./util/language/I18n";
import { LanguageSelector } from "./components/LanguageSelector";
import {Route, Routes, NavLink} from "react-router-dom"
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Devices from "./components/Devices";
import SignIn from "./components/SignIn";
import Drawer from "./components/DrawerComponent"
import Contact from "./components/Contact"
import PageNotFound from "./components/404";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const App = (): JSX.Element => {
  return (
    <>
    <Drawer />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/devices" element={<Devices/>}/>
        <Route path="/SignIn" element={<SignIn/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </>
  );
};

export default App;
