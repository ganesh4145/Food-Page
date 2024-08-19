import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CustomAppBar from "./CustomAppBar";
import axiosInstance from "./axiosInstance";

const RootContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f0f2f5",
  backgroundImage: `url(https://t3.ftcdn.net/jpg/06/16/60/64/360_F_616606409_eScSu5tRTs9BCTtNcX9eyP11KXQlhnun.jpg)`,
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

function ForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(true);
  const [response, setResponse] = useState("");

  const changepassword = async (e) => {
    e.preventDefault();
    const value = {
      phoneNumber: phoneNumber,
      password: password,
    };
    try {
      const res = await axiosInstance.put("/passwordupdate", value, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(`${res.data}`);
      setResponse(res.data);
      setPassword("");
      setPhoneNumber("");
    } catch (error) {
      console.log(error);
      setResponse(error.response ? error.response.data : "An error occurred");
    }
  };

  const passwordCheck = (password) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(
      password
    );
  };

  return (
    <>
      <CustomAppBar
        navItems={[
          { label: "Home", path: "/" },
          { label: "Login", path: "/login" },
          { label: "Sign Up", path: "/signup" },
        ]}
      />
      <RootContainer>
        <Container>
          <FormContainer onSubmit={changepassword}>
            <Typography variant="h5" gutterBottom>
              Forgot Password
            </Typography>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              margin="normal"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              required
            />
            <TextField
              fullWidth
              label="New Password"
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
            {response && <Typography color="error">{response}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Change
            </Button>
          </FormContainer>
        </Container>
      </RootContainer>
    </>
  );
}

export default ForgotPassword;
