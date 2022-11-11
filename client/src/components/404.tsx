import React, { useEffect, useState } from "react";
import { I18n } from "../util/language/I18n";

const PageNotFound = (): JSX.Element => {
  return (
    <>
        <h1>{I18n.t("page.404")}</h1>  
    </>
    );
};

export default PageNotFound;
