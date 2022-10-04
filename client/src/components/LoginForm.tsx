import React, { useEffect, useState } from "react";

const LoginForm = (): JSX.Element => {
  return (
  <>
    <form>
        <label htmlFor="username">Geef hier je gebruikersnaam in: </label><br />
        <input type="text" name="username" id="username"/><br />
        <label htmlFor="password">Geef hier je wachtwoord in: </label><br />
        <input type="password" name="password" id="password" /><br />
        <input type="submit" value="Login" />
      </form>
  </>);
};

export default LoginForm;
