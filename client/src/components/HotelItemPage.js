import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const StyledPaper = styled(Paper)(({ theme, disabled }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: disabled
    ? theme.palette.grey[300]
    : theme.palette.background.paper,
  "& button": {
    pointerEvents: disabled ? "none" : "auto",
  },
}));

const HotelItemPage = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [exists, setExists] = useState(false);
  const [itemId, setItemId] = useState("");
  const navigate = useNavigate();
  const date = new Date();
  const showTime = date.getHours() + ":" + date.getMinutes();

  useEffect(() => {
    axios
      .get(`http://localhost:3500/hotelList/${hotelId}`)
      .then((response) => {
        console.log(response.data);
        setHotel(response.data);
      })
      .catch((err) => console.log(err));
  }, [hotelId]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!hotel) {
    return <div>Loading...</div>;
  }

  const addToCart = (item) => {
    const cartItem = {
      hotelId: hotelId,
      userId: localStorage.getItem("uid"),
      itemId: item._id,
    };
    axios
      .post("http://localhost:3500/addcart", cartItem)
      .then((res) => {
        if (res.data.exists) {
          setExists(true);
          setItemId(item._id);
        }
      })
      .catch((err) => console.error(err));
  };

  const replaceToCart = () => {
    const item = {
      hotelId: hotelId,
      userId: localStorage.getItem("uid"),
      itemId: itemId,
    };
    axios
      .post("http://localhost:3500/replacecart", item)
      .then((res) => {
        console.log(res);
        setExists(false);
      })
      .catch((err) => console.error(err));
  };

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
            Cart
          </Button>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" gutterBottom>
          {hotel.hotelName}
        </Typography>
        <Grid container spacing={3}>
          {hotel.hotelItems.map((item) => {
            const isAvailable =
              (showTime >= item.fromTime && showTime <= item.toTime) ||
              item.quantity > 2 ||
              item.availability === true;
            return (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <StyledPaper disabled={!isAvailable}>
                  <Typography variant="h6">{item.itemName}</Typography>
                  <Typography variant="body1">₹ {item.price}</Typography>
                  {isAvailable ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Not Available
                    </Typography>
                  )}
                </StyledPaper>
              </Grid>
            );
          })}
        </Grid>
        <Dialog open={exists} onClose={() => setExists(false)}>
          <DialogTitle>Item Exists</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Item already exists in the cart. Do you want to replace it?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={replaceToCart} color="primary">
              Yes
            </Button>
            <Button onClick={() => setExists(false)} color="primary">
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default HotelItemPage;
