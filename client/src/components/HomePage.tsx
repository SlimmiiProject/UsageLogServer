import React, { useEffect, useState } from "react";
import { I18n, languages } from "../util/language/I18n";
import AddSensor from "./AddSensor";
import { LanguageSelector } from "./LanguageSelector";
import LoginForm from "./LoginForm";
import ProfileButton from "./ProfileButton";
import Profile from "./ProfileButton";

const HomePage = (): JSX.Element => {
  return (
    <>
    <section className="titleFlex">
        <h1>Slimmii CommV</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, vel!
        </p>
        <ProfileButton />
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
      <LoginForm />
    </section>
  </>
  );
};

export default HomePage;