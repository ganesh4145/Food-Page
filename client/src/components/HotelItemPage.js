import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const HotelItemPage = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  console.log(hotelId);

  const addItemToCart = (e) => {
    console.log(e);
  };

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
      <h2>{hotel.hotelName}</h2>

      {hotel.hotelItems.map((item) => (
        <div key={item._id}>
          <button
            onClick={() => addItemToCart(item)}
          >{`${item.itemName} ₹${item.price}`}</button>
        </div>
      ))}
    </div>
  );
};

export default HotelItemPage;
