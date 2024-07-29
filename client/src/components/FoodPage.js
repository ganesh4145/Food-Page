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
import Grid from "@mui/material/Grid";
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
  const { cartCount } = useContext(ItemContext);
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
          <Button color="inherit" component={Link} to="/foodpage">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            Cart ({cartCount})
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
        <Grid container spacing={2}>
          {hotelList.map((hotel) => (
            <Grid item xs={12} sm={6} key={hotel._id}>
              <StyledListItemButton
                component={Link}
                to={`/hotelList/${hotel._id}`}
              >
                <Typography variant="h6">{hotel.hotelName}</Typography>
              </StyledListItemButton>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default FoodPage;
