import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ element: Component }) => {
  const loginPrev = localStorage.getItem("LoggedIn");

  return loginPrev === "true" ? <element /> : <Navigate to="/login" />;
};

export default PrivateRouter;
