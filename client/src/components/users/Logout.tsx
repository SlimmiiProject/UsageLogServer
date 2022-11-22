import React from "react";
import { useNavigate } from "react-router-dom";
import { IOUtil } from "../../util/IOUtil";

const Logout = () => {
  const navigate = useNavigate();

  // Calling logout function, go to right page.
  React.useEffect(() => {
    IOUtil.logoutUser().then((res) =>
      !res ? navigate("/") : navigate("/dashboard")
    );
  }, []);

  return <h1>Loggin out ...</h1>;
};

export default Logout;
