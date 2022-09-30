import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import Profile from './Profile'
import AddSensor from './AddSensor'

const App = (): JSX.Element => {
  return (
  <>
    <h1>Slimmii CommV</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, vel!</p>
    <Profile />
    <AddSensor/>
    <section>
      <img src='./images/slimmii_500x500.png' alt="Placeholder logo" width={250}/>
      <LoginForm />
    </section>
  </>);
};

export default App;
