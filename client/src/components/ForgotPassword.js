import React, { useState } from "react";
import axios from "axios";

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
    const res = await axios.put("http://localhost:3500/passwordupdate", value, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`${res.data}`);
    setResponse(res.data);
    setPassword("");
    setPhoneNumber("");
  };

  const passwordCheck = (password) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(
      password
    );
  };
  return (
    <div>
      <h3>ForgotPassword</h3>
      <form onSubmit={changepassword}>
        <div>
          <label>Phone Number</label>
          <input
            type="number"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordValidation(passwordCheck(e.target.value));
            }}
            required
          />
        </div>
        <div>
          {!passwordValidation ? (
            <div>
              <h3>password wrong</h3>
            </div>
          ) : (
            ""
          )}
          {response}
        </div>
        <div>
          <button type="submit">Change</button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
