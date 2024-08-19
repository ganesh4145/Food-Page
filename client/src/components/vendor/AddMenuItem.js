import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import CustomAppBar from "../CustomAppBar";
import axiosInstance from "../axiosInstance";

const FormContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(4),
}));

const ItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  border: "1px solid #ccc",
  borderRadius: theme.shape.borderRadius,
}));

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
    const hotelId = localStorage.getItem("uid");
    const item = { hotelId, hotelItems: items };
    console.log("Items submitted:", JSON.stringify(item));
    await axiosInstance
      .post("/hoteldetails", item, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    setItems([
      { itemName: "", fromTime: "", toTime: "", quantity: "", price: "" },
    ]);
  };

  return (
    <div>
      <CustomAppBar
        navItems={[{ label: "Home", path: "/vendorpage" }]}
        logout
      />
      <FormContainer>
        <Typography variant="h4" gutterBottom>
          Add Menu Item
        </Typography>
        <form onSubmit={addItems} style={{ width: "100%" }}>
          {items.map((item, index) => (
            <ItemContainer key={index}>
              <TextField
                fullWidth
                label="Item Name"
                variant="outlined"
                value={item.itemName}
                onChange={(e) =>
                  handleChange(index, "itemName", e.target.value)
                }
                required
              />
              <TextField
                fullWidth
                label="From Time"
                type="time"
                variant="outlined"
                value={item.fromTime}
                onChange={(e) =>
                  handleChange(index, "fromTime", e.target.value)
                }
              />
              <TextField
                fullWidth
                label="To Time"
                type="time"
                variant="outlined"
                value={item.toTime}
                onChange={(e) => handleChange(index, "toTime", e.target.value)}
              />
              <TextField
                fullWidth
                label="Available Quantity"
                type="number"
                variant="outlined"
                value={item.quantity}
                onChange={(e) =>
                  handleChange(index, "quantity", e.target.value)
                }
              />
              <TextField
                fullWidth
                label="Price (₹)"
                type="number"
                variant="outlined"
                value={item.price}
                onChange={(e) => handleChange(index, "price", e.target.value)}
                required
              />
              <IconButton onClick={() => handleDelete(index)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </ItemContainer>
          ))}
          <Box display="flex" justifyContent="center" gap={2} marginTop={2}>
            <Button variant="contained" color="primary" onClick={addField}>
              Add New Column
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              Submit Item
            </Button>
          </Box>
        </form>
      </FormContainer>
    </div>
  );
};

export default AddMenuItem;
