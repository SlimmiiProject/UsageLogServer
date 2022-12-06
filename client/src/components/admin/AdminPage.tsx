import { AdminPageOneComponent } from "./AdminPageOneComponent";
import { I18n } from "../../util/language/I18n";
import { getPath } from "../../App";

export const AdminPage = (): JSX.Element => {
  const location =(path:string) => getPath(`admin/${path}`);

  return (
    <>
      <div className="boxnoborder">
        <h1 className="center">{I18n.t("admin.panel")}</h1>
        <div className="flex">
          <AdminPageOneComponent title={I18n.t("admin.allUsers")} link={location("allusers")} icon="profile" />
          <AdminPageOneComponent title={I18n.t("admin.logfile")} link={location("logfile")} icon="log" />
          <AdminPageOneComponent title={I18n.t("admin.allDevices")} link={location("alldevices")} icon="device" />
          <AdminPageOneComponent title={I18n.t("admin.translations")} link={location("translate")} icon="translate" />
        </div>
      </div>
    </>
  );
};
