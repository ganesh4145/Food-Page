import React from "react";
import { useNavigate } from "react-router-dom";

const FoodPage = () => {
  const navigate = useNavigate();
  const logout = () => {
    console.log(localStorage.getItem("tok"));
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <h2>FoodPage</h2>
      <button onClick={logout}>LogOut</button>
    </div>
  );
};

export default FoodPage;
