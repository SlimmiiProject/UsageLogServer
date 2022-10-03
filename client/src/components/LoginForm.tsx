import React, { useEffect, useState } from "react";
import {I18n} from "../util/language/I18n";

const LoginForm = (): JSX.Element => {
  return (
  <>
    <form>
        <label htmlFor="username">{I18n.t("username.text")}</label><br />
        <input type="text" name="username" id="username"/><br />
        <label htmlFor="password">Geef hier je wachtwoord in: </label><br />
        <input type="password" name="password" id="password" /><br />
        <input type="submit" value="Login" />
      </form>
  </>);
};

export default LoginForm;
