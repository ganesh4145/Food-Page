import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
    };
    console.log(request);
    try {
      await axios
        .post("http://localhost:3500/userregister", request, {
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
    <div>
      <h2>NEEM</h2>
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/login">
          <button>login</button>
        </Link>
      </nav>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameValidation(namecheck(e.target.value));
            }}
            required
          />
          {!nameValidation && (
            <div>
              <h3>Name should contain only letters and length must be 2-20</h3>
            </div>
          )}
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="number"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setNumberValidation(numberLength(e.target.value));
            }}
            required
          />
          {!numberValidation && (
            <div>
              <h3>Number length should contain 10</h3>
            </div>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailValidation(mailValidation(e.target.value));
            }}
            required
          />
          {!emailValidation && (
            <div>
              <h3>Please enter a valid email address</h3>
            </div>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordValidation(passwordCheck(e.target.value));
            }}
            required
          />
          <div>{!passwordValidation && <div>password wrong</div>}</div>
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div>
            {confirmPassword && confirmPassword !== password ? (
              <div>
                <h3>Password wrong</h3>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          <div>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label>Current City</label>
            <input
              type="text"
              value={currentCity}
              onChange={(e) => {
                setCurrentCity(e.target.value);
              }}
              required
            />
          </div>
          <div>{response}</div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Sign_Up;
