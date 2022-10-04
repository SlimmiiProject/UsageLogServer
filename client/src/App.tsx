import React, { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import AddSensor from "./components/AddSensor";
import { I18n, languages } from "./util/language/I18n";
import { LanguageSelector } from "./components/LanguageSelector";
import {Route, Routes, NavLink} from "react-router-dom"
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Devices from "./components/Devices";
import Drawer from "./components/DrawerComponent"
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
      </Routes>
    </>
  );
};

export default App;
