import React from "react";
import { useNavigate } from "react-router-dom";
import { IOUtil } from "../../util/IOUtil";

const Logout = () => {
  const navigate = useNavigate();
  // calling logout function, go to right page
  React.useEffect(() => {
    IOUtil.logoutUser().then((res) => {
      console.log(`Initial load useEffect ${res}`);
      res === undefined ? navigate("/dashboard") : navigate("/");
    });
  }, []);
  return (
    <>
      <h1>Loggin out ...</h1>
    </>
  );
};

export default Logout;
