import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("LoggedIn") === "true";
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRouter;
