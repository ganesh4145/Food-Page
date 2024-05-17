import React from "react";
import { useNavigate } from "react-router-dom";

const VendorPage = () => {
  const navigate = useNavigate();
  const logout = () => {
    console.log(localStorage.getItem("tok"));
    window.localStorage.clear();
    window.location.href = "./";
  };
  return (
    <div>
      <div>VendorPage</div>
      <button onClick={logout}>LogOut</button>
    </div>
  );
};

export default VendorPage;
