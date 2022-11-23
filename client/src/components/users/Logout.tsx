import React from "react";
import { useNavigate } from "react-router-dom";
import { getPath, setUserContext } from "../../App";
import { IOUtil } from "../../util/IOUtil";

const Logout = () => {
  const navigate = useNavigate();
  const userSetContext = React.useContext(setUserContext);

  // Calling logout function, go to right page.
  React.useEffect(() => {
    IOUtil.logoutUser().then((res) => {
      if (res) {
        userSetContext.setLoggedIn(false);
        return navigate(getPath(""));
      }

      navigate(getPath("dashboard"));
    });
  }, []);

  return <h1>Loggin out ...</h1>;
};

export default Logout;
