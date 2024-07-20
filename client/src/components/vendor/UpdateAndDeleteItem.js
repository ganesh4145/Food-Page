import axios from "axios";
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";

const ItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  border: "1px solid #ccc",
  borderRadius: theme.shape.borderRadius,
}));

const UpdateAndDeleteItem = () => {
  const [itemList, setItemList] = useState([]);
  const [hotelId, setHotelId] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({});
  const hotelName = localStorage.getItem("un");
  const navigate = useNavigate();

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

  const logout = () => {
    console.log(localStorage.getItem("tok"));
    window.localStorage.clear();
    window.location.href = "./";
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            NEEM
          </Typography>
          <Button color="inherit" onClick={() => navigate("/vendorpage")}>
            Home
          </Button>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" gutterBottom>
          Update and Delete Items
        </Typography>
        {itemList.map((item) => (
          <ItemContainer key={item._id}>
            {editingItemId === item._id ? (
              <>
                <TextField
                  label="Item Name"
                  variant="outlined"
                  name="itemName"
                  value={editedItem.itemName}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Price"
                  variant="outlined"
                  name="price"
                  value={editedItem.price}
                  onChange={handleChange}
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="availability"
                      checked={editedItem.availability}
                      onChange={handleChange}
                    />
                  }
                  label="Availability"
                />
                <TextField
                  label="From Time"
                  type="time"
                  variant="outlined"
                  name="fromTime"
                  value={editedItem.fromTime}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="To Time"
                  type="time"
                  variant="outlined"
                  name="toTime"
                  value={editedItem.toTime}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Quantity"
                  type="number"
                  variant="outlined"
                  name="quantity"
                  value={editedItem.quantity}
                  onChange={handleChange}
                  fullWidth
                />
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveClick(item._id)}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h6">{item.itemName}</Typography>
                <Typography>
                  <strong>Price:</strong> ₹{item.price}
                </Typography>
                <Typography>
                  <strong>Availability:</strong>{" "}
                  {item.availability ? "Available" : "Unavailable"}
                </Typography>
                <Typography>
                  <strong>From Time:</strong> {item.fromTime}
                </Typography>
                <Typography>
                  <strong>To Time:</strong> {item.toTime}
                </Typography>
                <Typography>
                  <strong>Quantity:</strong> {item.quantity}
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(item)}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(item._id)}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Box>
              </>
            )}
          </ItemContainer>
        ))}
      </Container>
    </div>
  );
};

export default UpdateAndDeleteItem;
