import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import axios from "axios";

const HotelName = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: theme.spacing(4),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

const VendorPage = () => {
  const navigate = useNavigate();
  const hotelId = localStorage.getItem("uid");
  const [userName, setUserName] = useState("");

  const logout = () => {
    console.log(localStorage.getItem("tok"));
    window.localStorage.clear();
    window.location.href = "./";
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3500/hotelname/${hotelId}`)
      .then((res) => {
        console.log(res);
        setUserName(res.data.user); // Assuming the API response has a user object with a name property
      })
      .catch((err) => {
        console.error(err);
      });
  }, [hotelId]);

  const handleAddMenuItem = () => {
    navigate("/addItemMenu");
  };

  const handleUpdateItem = () => {
    navigate("/updateitem");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            NEEM
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <HotelName variant="h1">{userName}</HotelName>
        <ButtonContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddMenuItem}
          >
            Add Menu Item
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUpdateItem}
          >
            Update and Delete Menu Item
          </Button>
        </ButtonContainer>
      </Container>
    </div>
  );
};

export default VendorPage;
