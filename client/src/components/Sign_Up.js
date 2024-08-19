import React, { useState } from "react";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import CustomAppBar from "./CustomAppBar";
import axiosInstance from "./axiosInstance";

const RootContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f0f2f5",
  backgroundImage: `url(https://img.freepik.com/premium-photo/raw-ingredients-cooking-spaghetti-marinara-with-poached-eggs-flat-lay-copy-spaces_63762-248.jpg)`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));

const FormContainer = styled("form")(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.8)", // Transparent background
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  marginTop: theme.spacing(2),
}));

const NavContainer = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },
    secondary: {
      main: "#ff5722",
    },
  },
});

const Sign_Up = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameValidation, setNameValidation] = useState(true);
  const [numberValidation, setNumberValidation] = useState(true);
  const [emailValidation, setEmailValidation] = useState(true);
  const [passwordValidation, setPasswordValidation] = useState(true);
  const [userType, setuserType] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = {
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      address: address,
      currentCity: currentCity,
      type: userType,
    };
    console.log(request);
    try {
      await axiosInstance
        .post("/userregister", request, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setResponse(response.data);
          console.log("error", response);
        });
    } catch (error) {
      setResponse(error.response.data);
      console.error("Error to send request", error);
    }
  };

  const namecheck = (name) => {
    return (
      /^[a-zA-Z]+[a-zA-Z ]*$/.test(name) &&
      name.length >= 2 &&
      name.length <= 20
    );
  };

  const numberLength = (number) => {
    return number.length === 10;
  };

  const mailValidation = (mail) => {
    return /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/.test(mail);
  };

  const passwordCheck = (password) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(
      password
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomAppBar
        navItems={[
          { label: "Home", path: "/" },
          { label: "Login", path: "/login" },
        ]}
      />
      <RootContainer>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <FormContainer onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameValidation(namecheck(e.target.value));
            }}
            required
          />
          {!nameValidation && (
            <Typography color="error">
              Name should contain only letters and length must be 2-20
            </Typography>
          )}
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            margin="normal"
            type="number"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setNumberValidation(numberLength(e.target.value));
            }}
            required
          />
          {!numberValidation && (
            <Typography color="error">
              Number length should contain 10
            </Typography>
          )}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailValidation(mailValidation(e.target.value));
            }}
            required
          />
          {!emailValidation && (
            <Typography color="error">
              Please enter a valid email address
            </Typography>
          )}
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordValidation(passwordCheck(e.target.value));
            }}
            required
          />
          {!passwordValidation && (
            <Typography color="error">
              Password must be 8-20 characters long and include at least one
              number and one special character.
            </Typography>
          )}
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {confirmPassword && confirmPassword !== password && (
            <Typography color="error">Passwords do not match</Typography>
          )}
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            margin="normal"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
          />
          <TextField
            fullWidth
            label="Current City"
            variant="outlined"
            margin="normal"
            value={currentCity}
            onChange={(e) => {
              setCurrentCity(e.target.value);
            }}
            required
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Choose a user type</FormLabel>
            <RadioGroup
              row
              value={userType}
              onChange={(e) => setuserType(e.target.value)}
            >
              <FormControlLabel
                value="Buyer"
                control={<Radio />}
                label="Buyer"
              />
              <FormControlLabel
                value="Seller"
                control={<Radio />}
                label="Seller"
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={
              !(
                nameValidation &&
                numberValidation &&
                emailValidation &&
                passwordValidation &&
                userType
              )
            }
          >
            Submit
          </Button>
          {response && (
            <Typography color="error" margin="normal">
              {response}
            </Typography>
          )}
        </FormContainer>
        <Box mt={2}>
          <Typography style={{ color: "white" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "white" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </RootContainer>
    </ThemeProvider>
  );
};

export default Sign_Up;
