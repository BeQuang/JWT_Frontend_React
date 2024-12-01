/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function PrivateRoutes({ children }) {
  let navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(">>>> check context user: ", user);
    let session = sessionStorage.getItem("account");
    if (!session) {
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
}

export default PrivateRoutes;
