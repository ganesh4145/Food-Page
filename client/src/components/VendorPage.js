import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VendorPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const logout = () => {
    console.log(localStorage.getItem("tok"));
    window.localStorage.clear();
    window.location.href = "./";
  };

  useEffect(() => {
    setUserName(localStorage.getItem("un"));
  }, []);

  const handleAddMenuItem = () => {
    navigate("/addItemMenu");
  };

  const handleUpdateItem = () => {
    navigate("/updateitem");
  };

  return (
    <div>
      <div>VendorPage</div>
      <button onClick={logout}>LogOut</button>
      <h1>{userName}</h1>

      <button onClick={handleAddMenuItem}>Add Menu Item</button>

      <button onClick={handleUpdateItem}>Update and Delete Menu Item</button>
    </div>
  );
};

export default VendorPage;
