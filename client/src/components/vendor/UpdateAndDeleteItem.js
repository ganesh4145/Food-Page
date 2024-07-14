import axios from "axios";
import React, { useState, useEffect } from "react";

function UpdateAndDeleteItem() {
  const [itemList, setItemList] = useState([]);
  const [hotelId, setHotelId] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItem, setEditedItem] = useState([]);
  const hotelName = localStorage.getItem("un");

  useEffect(() => {
    axios
      .get(`http://localhost:3500/item/${hotelName}`)
      .then((res) => {
        console.log(res.data.hotelItems);
        setItemList(res.data.hotelItems);
        setHotelId(res.data._id);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, [hotelName]);

  const handleEditClick = (item) => {
    setEditingItemId(item._id);
    setEditedItem(item);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedItem((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveClick = (id) => {
    const updatedItems = itemList.map((item) =>
      item._id === id ? editedItem : item
    );
    setItemList(updatedItems);
    setEditingItemId(null);

    axios
      .put(`http://localhost:3500/item/${hotelId}/${id}`, editedItem)
      .then((res) => {
        console.log("Item updated successfully");
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
    console.log(`edit item ${updatedItems}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3500/deleteitem/${hotelId}/${id}`)
      .then((res) => {
        console.log("Item deleted successfully");
        const updatedItems = itemList.filter((item) => item._id !== id);
        setItemList(updatedItems);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <div>
      <h1>UpdateAndDeleteItem</h1>

      {itemList.map((item) => (
        <div key={item._id}>
          {editingItemId === item._id ? (
            <div>
              <div>Name - {item.itemName}</div>
              <div>
                Price -{" "}
                <input
                  type="text"
                  name="price"
                  value={editedItem.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                Availability -{" "}
                <input
                  type="checkbox"
                  name="availability"
                  checked={editedItem.availability}
                  onChange={handleChange}
                />
              </div>
              <div>
                FromTime -{" "}
                <input
                  type="time"
                  name="fromTime"
                  value={editedItem.fromTime}
                  onChange={handleChange}
                />
              </div>
              <div>
                ToTime -{" "}
                <input
                  type="time"
                  name="toTime"
                  value={editedItem.toTime}
                  onChange={handleChange}
                />
              </div>
              <div>
                Quantity -{" "}
                <input
                  type="number"
                  name="quantity"
                  value={editedItem.quantity}
                  onChange={handleChange}
                />
              </div>
              <button onClick={() => handleSaveClick(item._id)}>Save</button>
            </div>
          ) : (
            <div>
              Name - {item.itemName} Price - {item.price} Availability -{" "}
              {item.availability ? "true" : "false"} FromTime - {item.fromTime}{" "}
              ToTime - {item.toTime} Quantity - {item.quantity}
              <div>
                <button onClick={() => handleEditClick(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UpdateAndDeleteItem;
