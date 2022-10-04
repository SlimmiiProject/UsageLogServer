import React, { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
<<<<<<< HEAD
import Profile from "./components/Profile";
import AddSensor from "./components/AddSensor";
import { I18n, languages } from "./util/language/I18n";
import { LanguageSelector } from "./components/LanguageSelector";
import "./styles.css"
=======
import Profile from "./components/ProfileButton";
import AddSensor from "./components/AddSensor";
import { I18n, languages } from "./util/language/I18n";
import { LanguageSelector } from "./components/LanguageSelector";
import {Route, Routes, NavLink} from "react-router-dom"
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Devices from "./components/Devices";
>>>>>>> 054818ed6e9232027c22579200c799efa3520f28

const App = (): JSX.Element => {
  return (
    <>
<<<<<<< HEAD
      <h1>Slimmii CommV</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, vel!
      </p>
      <Profile />
      <AddSensor />
      <LanguageSelector languages={languages} />
      <section>
        <img
          src="./images/slimmii_500x500.png"
          alt="Placeholder logo"
          width={250}
        />
        <LoginForm />
      </section>
=======
      <nav>
        <ul>
          <li><NavLink to ="/">Startpagina</NavLink></li>
          <li><NavLink to ="/register">Registreer</NavLink></li>
          <li><NavLink to ="/profile">Profiel</NavLink></li>
          <li><NavLink to ="/devices">Meters/apparaten</NavLink></li>
          <li></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/devices" element={<Devices/>}/>
      </Routes>
>>>>>>> 054818ed6e9232027c22579200c799efa3520f28
    </>
  );
};

export default App;
