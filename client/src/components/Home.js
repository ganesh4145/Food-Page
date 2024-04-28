import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
      <div>
        <Link to="/signup">
          <button>Sign up</button>
        </Link>
      </div>
      <div>
        <Link to="/signupvendor">
          <button>Sign up Vendor</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
