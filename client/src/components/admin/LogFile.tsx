import React from "react";
import { I18n } from "../../util/language/I18n";

export const LogFile = (): JSX.Element => {
  return (
    <>
      <div className="flexbox">
        <h2>{I18n.t("logger.title")}</h2>
      </div>
    </>
  );
};
