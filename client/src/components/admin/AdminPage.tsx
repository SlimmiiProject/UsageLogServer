import { AdminPageOneComponent } from "./AdminPageOneComponent";
import { I18n } from "../../util/language/I18n";
import { getPath } from "../../App";

export const AdminPage = (): JSX.Element => {
  const location = (path: string) => getPath(`admin/${path}`);

  return (
    <>
      <div className="boxnoborder">
        <h1 className="center" style={{marginBottom:"2rem"}}>{I18n.t("admin.panel")}</h1>
        <div className="flex" style={{justifyContent:"space-evenly", rowGap:"2rem", marginBottom:"1rem"}}>
          <AdminPageOneComponent title={I18n.t("admin.allUsers")} link={location("allusers")} icon="profile" />
          <AdminPageOneComponent title={I18n.t("admin.logfile")} link={location("logfile")} icon="log" />
          <AdminPageOneComponent title={I18n.t("admin.allDevices")} link={location("alldevices")} icon="device" />
        </div>
      </div>
    </>
  );
};
