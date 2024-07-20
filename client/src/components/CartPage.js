import React, { useContext } from "react";
import { ItemContext } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

const CartPage = () => {
  const {
    cartItems,
    increaseItem,
    decreaseItem,
    removeItem,
    displayItem,
    cartCount,
  } = useContext(ItemContext); // Access cartCount from context

  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const logout = () => {
    console.log(localStorage.getItem("tok"));
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
          Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Typography variant="h6" gutterBottom>
            Cart is Empty
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {cartItems.map((item) => {
              const date = new Date();
              const showTime = date.getHours() + ":" + date.getMinutes();

              // Check if the item should be visible based on the conditions
              const isItemVisible =
                (showTime >= item.fromTime && showTime <= item.toTime) ||
                item.quantity > 2 ||
                item.availability === true;

              return (
                <Grid item xs={12} key={item._id}>
                  <StyledPaper
                    style={{
                      backgroundColor: isItemVisible ? "#fff" : "#f0f0f0",
                      pointerEvents: isItemVisible ? "auto" : "none",
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="h6">{item.hotelName}</Typography>
                        <Typography variant="h3">{item.itemName}</Typography>
                        <Typography variant="body1">
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography variant="body1">
                          Price: ₹{item.price}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton
                          color="primary"
                          onClick={() => increaseItem(item._id)}
                          disabled={!isItemVisible}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => decreaseItem(item._id)}
                          disabled={!isItemVisible}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => removeItem(item._id)}
                          disabled={!isItemVisible}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </StyledPaper>
                </Grid>
              );
            })}
          </Grid>
        )}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography variant="h5">Total Amount: ₹{totalAmount}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => displayItem()}
          >
            Display
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default CartPage;
