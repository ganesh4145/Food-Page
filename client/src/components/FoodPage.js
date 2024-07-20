import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ItemContext } from "./CartContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    outline: `2px solid ${theme.palette.primary.main}`,
  },
  "&:focus": {
    outline: `2px solid ${theme.palette.primary.main}`,
  },
}));

const FoodPage = () => {
  const [hotelList, setHotelList] = useState([]);
  const { cartCount } = useContext(ItemContext); // Access cartCount from context
  const navigate = useNavigate();

  const logout = () => {
    console.log(localStorage.getItem("tok"));
    localStorage.clear();
    navigate("/");
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            NEEM
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            Cart ({cartCount}) {/* Display cart count */}
          </Button>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" gutterBottom>
          Hotel List
        </Typography>
        <List>
          {hotelList.map((hotel) => (
            <ListItem key={hotel._id}>
              <StyledListItemButton
                component={Link}
                to={`/hotelList/${hotel._id}`}
              >
                <Typography variant="h6">{hotel.hotelName}</Typography>
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default FoodPage;
