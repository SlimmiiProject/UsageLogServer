import React from "react";
import { AdminPageOneComponent } from "./AdminPageOneComponent";
import { AllUsers } from "./AllUsers";
import { LogFile } from "./LogFile";

export const AdminPage = (): JSX.Element => {
  return (
    <>
      <div className="boxnoborder">
        <h1 className="center">Admin Panel</h1>
        <div className="flex">
          <AdminPageOneComponent
            title="Alle gebruikers"
            link="/admin/allusers"
            icon="profile"
          />
          <AdminPageOneComponent
            title="Logfile"
            link="/admin/logfile"
            icon="log"
          />
          <AdminPageOneComponent
            title="Alle apparaten"
            link="/admin/alldevices"
            icon="device"
          />
        </div>
      </div>
    </>
  );
};
