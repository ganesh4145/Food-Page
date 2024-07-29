import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const CartPage = () => {
  const [cartItem, setCartItem] = useState([]);
  const [hotelId, setHotelId] = useState("");
  const [unavailableItems, setUnavailableItems] = useState([]);
  const userId = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [hotelName, setHotelName] = useState("");

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    await axios
      .get(`http://localhost:3500/cartlist/${userId}`)
      .then((res) => {
        setCartItem(res.data.cart.items);
        setHotelId(res.data.cart.hotelId);
        console.log(`hotel name ${res.data.cart.hotelId}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const itemCountIncrease = (id) => {
    axios
      .put(`http://localhost:3500/increasecount/${userId}/${id}`)
      .then(() => {
        fetchCartItems();
      });
  };

  const itemCountDecrease = (item) => {
    if (item.quantity > 1) {
      axios
        .put(`http://localhost:3500/decresecount/${userId}/${item.itemId}`)
        .then(() => {
          fetchCartItems();
        });
    } else {
      axios
        .delete(`http://localhost:3500/removeitem/${userId}/${item.itemId}`)
        .then(() => {
          fetchCartItems();
        });
    }
  };

  const itemRemove = (id) => {
    axios
      .delete(`http://localhost:3500/removeitem/${userId}/${id}`)
      .then(() => {
        fetchCartItems();
      });
  };

  const calculateTotal = () => {
    return cartItem.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const checkAvailability = async () => {
    const unavailable = [];
    for (const item of cartItem) {
      const res = await axios.get(
        `http://localhost:3500/availability/${hotelId}/${item.itemId}`
      );
      if (!res.data.itemAvailability) {
        unavailable.push(item);
      }
    }
    return unavailable;
  };

  const order = async () => {
    console.log(`cartItem - ${cartItem}`);
    const unavailableItems = await checkAvailability();
    if (unavailableItems.length > 0) {
      setUnavailableItems(unavailableItems);
    } else {
      axios
        .post(
          `http://localhost:3500/orderItem/${localStorage.getItem("uid")}`,
          {
            item: cartItem,
            hotelId: hotelId,
          }
        )
        .then((res) => {
          console.log(res.data);
          setCartItem([]);
          setStatus("Order successful");
        })
        .catch((error) => {
          console.log(error);
          setStatus("Order failed");
        });
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
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
          Cart Items
        </Typography>

        <Grid container spacing={3}>
          {cartItem.map((item) => (
            <Grid item xs={12} key={item.itemId}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="h6">{item.itemName}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1">
                      Price: ₹{item.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1">
                      Quantity: {item.quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container spacing={1}>
                      <Grid item>
                        <IconButton
                          onClick={() => itemCountIncrease(item.itemId)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton onClick={() => itemCountDecrease(item)}>
                          <RemoveIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton onClick={() => itemRemove(item.itemId)}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider sx={{ margin: 1 }} />
                <Typography variant="body2">
                  Sub Total: ₹{item.price * item.quantity}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          Total: ₹{calculateTotal()}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={order}
          sx={{ marginTop: 2 }}
        >
          Order
        </Button>
        <Dialog
          open={unavailableItems.length > 0}
          onClose={() => setUnavailableItems([])}
        >
          <DialogTitle>Unavailable Items</DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you want to order the food, remove the unavailable items. The
              following items are not available:
            </DialogContentText>
            {unavailableItems.map((item) => (
              <DialogContentText key={item.itemId}>
                {item.itemName}
              </DialogContentText>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUnavailableItems([])} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {status && (
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            {status}
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
