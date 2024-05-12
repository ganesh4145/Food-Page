import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login_Page() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [responseCode, setResponseCode] = useState("");
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
      setResponse(response.data);
      setResponseCode("200");
    } catch (error) {
      setResponse(error.response.data);
      console.log(error.response.data);
    }
  };
  return (
    <div>
      <nav>
        <h3>NEEM</h3>

        <Link to="/">
          <button>Home</button>
        </Link>

        <Link to="/signup">
          <button>Sign Up</button>
        </Link>

        <Link to="/signupvendor">
          <button>Sign up Vendor</button>
        </Link>
      </nav>
      <hr />
      <h2>Login Page</h2>
      <form onSubmit={logindetails}>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          {response && responseCode == "200" ? navigate("/foodpage") : ""}
        </div>
        <button type="submit">Login</button>
      </form>
      <a href="www.google.com" target="_self">
        Forgot Password
      </a>
      <div>
        Did not have account?{" "}
        <Link to="/signup">
          <a href="" target="_self">
            Create Account
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Login_Page;
