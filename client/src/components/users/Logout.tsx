import React from "react";
import { useNavigate } from "react-router-dom";
import { IOUtil } from "../../util/IOUtil";

const Logout = () => {
  const [loggedOut, setLoggedOut] = React.useState<boolean>(false);

  const navigate = useNavigate();
  React.useEffect(() => {
    loggedOut ? navigate("/") : navigate("/dashboard");
  }, [loggedOut, navigate]);

  // calling logout function, assigning return value to loggedOut
  React.useEffect(() => {
    IOUtil.logoutUser().then((res) => {
      res === undefined ? setLoggedOut(false) : setLoggedOut(res);
    });
  }, []);

  return (
    <>
      <h1>Loggin out ...</h1>
    </>
  );
};

export default Logout;
