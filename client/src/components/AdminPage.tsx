import { useLocation } from "react-router-dom";
import { getCurrentPath } from "../App";
import { AdminPageOneComponent } from "./AdminPageOneComponent";

export const AdminPage = (): JSX.Element => {
  const location = getCurrentPath(useLocation());
  return (
    <>
      <div className="boxnoborder">
        <h1 className="center">Admin Panel</h1>
        <div className="flex">
          <AdminPageOneComponent
            title="Alle gebruikers"
            link={`${location}/allusers`}
            icon="profile"
          />
          <AdminPageOneComponent
            title="Logfile"
            link={`${location}/logfile`}
            icon="log"
          />
          <AdminPageOneComponent
            title="Alle apparaten"
            link={`${location}/alldevice`}
            icon="device"
          />
          <AdminPageOneComponent
            title="Vertalingen"
            link={`${location}/translate`}
            icon="translate"
          />
        </div>
      </div>
    </>
  );
};
