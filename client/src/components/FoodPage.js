import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ListItemButton from "@mui/material/ListItemButton";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import CustomAppBar from "./CustomAppBar";
import axiosInstance from "./axiosInstance";

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

  useEffect(() => {
    axiosInstance
      .get("/hotelList")
      .then((response) => {
        console.log(response.data);
        setHotelList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <CustomAppBar
        navItems={[
          { label: "Home", path: "/foodpage" },
          { label: "Cart", path: "/cart" },
        ]}
        logout
      />
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
