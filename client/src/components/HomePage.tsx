import Drawer from "./DrawerComponent";
import React, { useEffect, useState } from "react";
import { I18n } from "../util/language/I18n";
import AddSensor from "./AddSensor";
import { LanguageSelector } from "./LanguageSelector";
import SignIn from "./SignIn";

const HomePage = (): JSX.Element => {
  return (
    <>
      <section>
        <SignIn />
      </section>
    </>
  );
};

export default HomePage;
