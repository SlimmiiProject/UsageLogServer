import React from "react";
import { useNavigate } from "react-router-dom";
import { getPath, userContext } from "../../App";
import { IOUtil } from "../../util/IOUtil";

const Logout = () => {
  const navigate = useNavigate();
  const userContextData = React.useContext(userContext);

  // Calling logout function, go to right page.
  React.useEffect(() => {
    IOUtil.logoutUser().then((res) => {
      if (res) {
        userContextData.logout();
        return navigate(getPath(""));
      }

      navigate(getPath("dashboard"));
    });
  },);

  return <h1>Loggin out ...</h1>;
};

export default Logout;
