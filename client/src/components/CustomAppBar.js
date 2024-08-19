import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const CustomAppBar = ({ navItems, logout }) => {
  const logoutprc = () => {
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
          {navItems &&
            navItems.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                component={Link}
                to={item.path}
              >
                {item.label}
              </Button>
            ))}
          {logout && (
            <Button color="inherit" onClick={logoutprc}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CustomAppBar;
