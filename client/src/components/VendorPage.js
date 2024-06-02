import React, { useState, useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import AddMenuItem from "./vendor/AddMenuItem";

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

  return (
    <div>
      <div>VendorPage</div>
      <button onClick={logout}>LogOut</button>
      <h1>{userName}</h1>

      <Routes>
        <Route path="/addItemMenu" element={<AddMenuItem />} />
      </Routes>

      <button onClick={handleAddMenuItem}>Add Menu Item</button>
      <button>Update and Delete Menu Item</button>
    </div>
  );
};

export default VendorPage;
