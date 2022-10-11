import  Drawer  from "./DrawerComponent";
import React, { useEffect, useState } from "react";
import { I18n, languages } from "../util/language/I18n";
import AddSensor from "./AddSensor";
import { LanguageSelector } from "./LanguageSelector";
import SignIn from "./SignIn";


const HomePage = (): JSX.Element => {
  return (
    <>
    <section className="titleFlex">
        <h1>Slimmii CommV</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, vel!
        </p>
    </section>
    <AddSensor />
    <LanguageSelector languages={languages} />
    <section>
      <img
        src="./images/slimmii_500x500.png"
        alt="Placeholder logo"
        width={250}
      />
      <p>{I18n.t("custom.test")}</p>
      <SignIn/>
    </section>
  </>
  );
};


export default HomePage;