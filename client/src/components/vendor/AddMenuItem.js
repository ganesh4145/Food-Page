import React, { useState } from "react";

const AddMenuItem = () => {
  const [items, setItems] = useState([
    { itemName: "", fromTime: "", toTime: "", quantity: "", price: "" },
  ]);

  const addNewItem = () => {
    setItems([
      ...items,
      { itemName: "", fromTime: "", toTime: "", quantity: "", price: "" },
    ]);
  };

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = { name: localStorage.getItem("un"), items };
    console.log("Items submitted:", item);
    // You can send the items to the server here
  };

  return (
    <div>
      <div>AddMenuItem</div>
      <h2>Add Menu</h2>
      <form onSubmit={handleSubmit}>
        {items.map((item, index) => (
          <div key={index}>
            <label>Item Name</label>
            <input
              type="text"
              placeholder="Item Name"
              value={item.itemName}
              onChange={(e) => handleChange(index, "itemName", e.target.value)}
            />
            <label>From Time</label>
            <input
              type="time"
              value={item.fromTime}
              onChange={(e) => handleChange(index, "fromTime", e.target.value)}
            />
            <label>To Time</label>
            <input
              type="time"
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
            <label>Price</label>
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
            />
            <button type="button" onClick={() => handleRemoveItem(index)}>
              Delete
            </button>
          </div>
        ))}
        <input type="submit" value="Submit" />
      </form>
      <button onClick={addNewItem}>Add New Item</button>
    </div>
  );
};

export default AddMenuItem;
