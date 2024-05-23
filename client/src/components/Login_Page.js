import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      setResponse(response.data.msg);
      if (response.status === 200) {
        navigate(
          response.data.userType == "Buyer" ? "/foodpage" : "/vendorpage"
        );
      }
    } catch (error) {
      setResponse(error.response.data);
      console.log(error.response.data);
    }
  };
  return (
    <div>
      <nav>
        
        <ul className="nav justify-content-center">
        <li className="nav-item">
        <h3 className="float-left">NEEM</h3>
  </li>
  <li className="nav-item">
    <a className="nav-link active" aria-current="page" href="/">Home</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/signup">Sign Up</a>
  </li>
  
</ul>
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
        <div>{response}</div>
        <button type="submit" className="btn btn-success">Login</button>
      </form>
      <Link to="/forgotpassword">
        <a>Forgot Password</a>
      </Link>
      <div>
        Did not have account?{" "}
        <Link to="/signup">
          <a>Create Account</a>
        </Link>
      </div>
    </div>
  );
}

export default Login_Page;
