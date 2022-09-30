import React, { useEffect, useState } from "react";

const App = (): JSX.Element => {
  return (
  <>
    <h1>Slimmii CommV</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, vel!</p>
    <section>
      <img src='./images/slimmii_500x500.png' alt="Placeholder logo" width={250}/>
      <form>
        <label htmlFor="username">Geef hier je gebruikersnaam in: </label><br />
        <input type="text" name="username" id="username"/><br />
        <label htmlFor="password">Geef hier je wachtwoord in: </label><br />
        <input type="password" name="password" id="password" /><br />
        <input type="submit" value="Login" />
      </form>
    </section>
  </>);
};

export default App;
