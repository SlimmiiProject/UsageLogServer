import { useLocation } from "react-router-dom";
import { getCurrentPath } from "../../App";
import { AdminPageOneComponent } from "./AdminPageOneComponent";
import { I18n } from "../util/language/I18n";

export const AdminPage = (): JSX.Element => {
  const location = getCurrentPath(useLocation());
  return (
    <>
      <div className="boxnoborder">
        <h1 className="center">{I18n.t("admin.panel")}</h1>
        <div className="flex">
          <AdminPageOneComponent
            title={I18n.t("admin.allUsers")}
            link={`${location}/allusers`}
            icon="profile"
          />
          <AdminPageOneComponent
            title={I18n.t("admin.logfile")}
            link={`${location}/logfile`}
            icon="log"
          />
          <AdminPageOneComponent
            title={I18n.t("admin.allDevices")}
            link={`${location}/alldevice`}
            icon="device"
          />
          <AdminPageOneComponent
            title={I18n.t("admin.translations")}
            link={`${location}/translate`}
            icon="translate"
          />
        </div>
      </div>
    </>
  );
};
