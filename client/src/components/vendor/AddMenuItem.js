import React, { useState } from "react";
import axios from "axios";

const AddMenuItem = () => {
  const [items, setItems] = useState([
    { itemName: "", fromTime: "", toTime: "", quantity: "", price: "" },
  ]);

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addField = () => {
    setItems([
      ...items,
      { itemName: "", fromTime: "", toTime: "", quantity: "", price: "" },
    ]);
  };

  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const addItems = async (e) => {
    e.preventDefault();
    const hotelName = localStorage.getItem("un");
    const item = { hotelName, hotelItems: items }; // Change here
    console.log("Items submitted:", item);
    await axios
      .post("http://localhost:3500/hoteldetails", item, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div>AddMenuItem</div>
      <h2>addmenu</h2>
      <form onSubmit={addItems}>
        {items.map((item, index) => (
          <div key={index}>
            <label>Item Name</label>
            <input
              type="text"
              placeholder="Item Name"
              value={item.itemName}
              onChange={(e) => handleChange(index, "itemName", e.target.value)}
              required
            />
            <label>From Time</label>
            <input
              type="time"
              placeholder="From Time"
              value={item.fromTime}
              onChange={(e) => handleChange(index, "fromTime", e.target.value)}
            />
            <label>To Time</label>
            <input
              type="time"
              placeholder="To Time"
              value={item.toTime}
              onChange={(e) => handleChange(index, "toTime", e.target.value)}
            />
            <label>Available Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
            />
            <label>₹</label>
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
              required
            />
            <button type="button" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </div>
        ))}
        <input type="submit" value="Submit" />
      </form>
      <button onClick={addField}>Add New Item</button>
    </div>
  );
};

export default AddMenuItem;
