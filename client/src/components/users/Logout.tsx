import React from "react";
import { useNavigate } from "react-router-dom";
import { IOUtil } from "../../util/IOUtil";

const Logout = () => {
  const [loggedOut, setLoggedOut] = React.useState<boolean>(false);
  const navigate = useNavigate();
  // when loggedOut changes it is gonna navigate to the right page
  React.useEffect(() => {
    console.log(`after updating loggedOut ${loggedOut}`);
    loggedOut ? navigate("/") : navigate("/dashboard");
  }, [loggedOut]);

  // calling logout function, assigning return value to loggedOut
  React.useEffect(() => {
    IOUtil.logoutUser().then((res) => {
      console.log(`Initial load useEffect ${res}`);
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
