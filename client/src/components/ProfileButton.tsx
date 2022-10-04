import React, { useEffect, useState } from "react";

const ProfileButton = (): JSX.Element => {
  return (
  <>
    <ul>
        <li>Profiel 
            <ul>
                <li>Beheer mijn gegevens</li>
                <li>Beheer mijn sensoren</li>
                <li>Logout</li>
            </ul>
            </li>
    </ul>
  </>);
};

export default ProfileButton;
