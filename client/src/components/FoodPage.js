import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const FoodPage = () => {
  const [hotelList, setHotelList] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    console.log(localStorage.getItem("tok"));
    localStorage.clear();
  };

  useEffect(() => {
    axios
      .get("http://localhost:3500/hotelList")
      .then((response) => {
        console.log(response.data);
        setHotelList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>FoodPage</h2>
      {hotelList.map((hotel) => (
        <div key={hotel._id}>
          <Link to={`/hotelList/${hotel._id}`}>
            <button>{hotel.hotelName}</button>
          </Link>
        </div>
      ))}
      <Link to="/">
        <button onClick={logout}>LogOut</button>
      </Link>
    </div>
  );
};

export default FoodPage;
