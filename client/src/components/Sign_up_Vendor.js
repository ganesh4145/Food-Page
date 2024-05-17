import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sign_up_Vendor = () => {
  const [hotelName, setHotelName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameValidation, setNameValidation] = useState(true);
  const [numberValidation, setNumberValidation] = useState(true);
  const [emailValidation, setEmailValidation] = useState(true);
  const [passwordValidation, setPasswordValidation] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      hotelName: hotelName,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      address: address,
      city: city,
      type: "vendor",
    };
    console.log(request);
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
      <h1>Sign Up Vendor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Hotel Name</label>
          <input
            type="text"
            value={hotelName}
            onChange={(e) => {
              setHotelName(e.target.value);
              setNameValidation(namecheck(e.target.value));
            }}
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
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailValidation(mailValidation(e.target.value));
            }}
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
          />
          <div>{!passwordValidation && <div>password wrong</div>}</div>
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="text"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
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
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={
              !(
                nameValidation &&
                numberValidation &&
                emailValidation &&
                passwordValidation
              )
            }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sign_up_Vendor;
