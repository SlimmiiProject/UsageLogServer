import React from "react";
import { useLocation } from "react-router-dom";
import { AdminPageOneComponent } from "./AdminPageOneComponent";
import { AllUsers } from "./AllUsers";
import { LogFile } from "./LogFile";

export const AdminPage = (): JSX.Element => {
  let location = useLocation();
  if (location.pathname[location.pathname.length - 1] === "/") {
    location.pathname = location.pathname.substring(
      0,
      location.pathname.length - 1
    );
  }
  return (
    <>
      <div className="boxnoborder">
        <h1 className="center">Admin Panel</h1>
        <div className="flex">
          <AdminPageOneComponent
            title="Alle gebruikers"
            link={`${location.pathname}/allusers`}
            icon="profile"
          />
          <AdminPageOneComponent
            title="Logfile"
            link={`${location.pathname}/logfile`}
            icon="log"
          />
          <AdminPageOneComponent
            title="Alle apparaten"
            link={`${location.pathname}/alldevice`}
            icon="device"
          />
          <AdminPageOneComponent
            title="Vertalingen"
            link={`${location.pathname}/translate`}
            icon="translate"
          />
        </div>
      </div>
    </>
  );
};
