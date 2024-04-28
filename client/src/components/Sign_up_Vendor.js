import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sign_up_Vendor = () => {
  const [vendorSignUp, setVendorSignUp] = useState({
    Hotel_Name: "",
    Phone_Number: "",
    Email: "",
    Password: "",
    Address: "",
    City: "",
    Type_of_Hotel: "",
  });

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setVendorSignUp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const add = (e) => {
    e.preventDefault();
    console.log(vendorSignUp);
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
      <form onSubmit={add}>
        <div>
          <label>Hotel Name</label>
          <input
            type="text"
            name="Hotel_Name"
            value={vendorSignUp.Hotel_Name}
            onChange={handlerChange}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="number"
            name="Phone_Number"
            value={vendorSignUp.Phone_Number}
            onChange={handlerChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="Email"
            value={vendorSignUp.Email}
            onChange={handlerChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="Password"
            value={vendorSignUp.Password}
            onChange={handlerChange}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="Confirm_Password"
            value={vendorSignUp.Confirm_Password}
            onChange={handlerChange}
          />
        </div>
        <div>
          <div>
            <label>Address</label>
            <input
              type="text"
              name="Address"
              value={vendorSignUp.Address}
              onChange={handlerChange}
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              name="City"
              value={vendorSignUp.City}
              onChange={handlerChange}
            />
          </div>
          <div>
            <label>Type of Hotel</label>
            <input
              type="text"
              name="Type_of_Hotel"
              value={vendorSignUp.Type_of_Hotel}
              onChange={handlerChange}
            />
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Sign_up_Vendor;
