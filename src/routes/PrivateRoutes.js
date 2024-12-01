/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function PrivateRoutes({ children }) {
  const { user } = useContext(UserContext);

  if (user && user.isAuthenticated === true) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoutes;
