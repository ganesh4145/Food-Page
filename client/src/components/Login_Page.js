import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const RootContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f0f2f5",
  backgroundImage: `url(https://www.tastingtable.com/img/gallery/why-foods-are-plated-on-a-curve-in-fancy-restaurants/intro-1672689354.jpg)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const FormContainer = styled("form")(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
}));

const NavContainer = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

function Login_Page() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const logindetails = async (e) => {
    e.preventDefault();
    try {
      const login = {
        phoneNumber: phoneNumber,
        password: password,
      };
      const response = await axios.post("http://localhost:3500/login", login, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      localStorage.setItem("tok", response.data.token);
      localStorage.setItem("LoggedIn", true);
      localStorage.setItem("ty", response.data.userType);
      localStorage.setItem("un", response.data.userName);
      setResponse(response.data.msg);
      if (response.status === 200) {
        navigate(
          response.data.userType === "Buyer" ? "/foodpage" : "/vendorpage"
        );
      }
    } catch (error) {
      setResponse(error.response.data);
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Container>
          <NavContainer>
            <Typography variant="h6" noWrap>
              NEEM
            </Typography>
            <div>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </div>
          </NavContainer>
        </Container>
      </AppBar>
      <RootContainer>
        <FormContainer onSubmit={logindetails}>
          <Typography variant="h5" gutterBottom>
            Login Page
          </Typography>
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {response && <Typography color="error">{response}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Box mt={2}>
            <Link to="/forgotpassword">Forgot Password</Link>
          </Box>
          <Box mt={2}>
            <Typography>
              Did not have account? <Link to="/signup">Create Account</Link>
            </Typography>
          </Box>
        </FormContainer>
      </RootContainer>
    </div>
  );
}

export default Login_Page;
