import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ItemContext } from "./CartContext";

const HotelItemPage = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const { addToCart, cartItems } = useContext(ItemContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3500/hotelList/${hotelId}`)
      .then((response) => {
        console.log(response.data);
        setHotel(response.data);
      })
      .catch((err) => console.log(err));
  }, [hotelId]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/cart">
        <button>Cart</button>
      </Link>
      <h2>{hotel.hotelName}</h2>
      {hotel.hotelItems.map((item) => (
        <div key={item._id}>
          <button onClick={() => addToCart(item)}>
            {`${item.itemName} ₹${item.price}`}
          </button>
        </div>
      ))}
    </div>
  );
};

export default HotelItemPage;
