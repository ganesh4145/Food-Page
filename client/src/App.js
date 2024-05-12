import React from "react";
import Login_Page from "./components/Login_Page";
import Home from "./components/Home";
import Sign_Up from "./components/Sign_Up";
import Sign_up_Vendor from "./components/Sign_up_Vendor";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FoodPage from "./components/FoodPage";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login_Page />} />
          <Route path="/signup" element={<Sign_Up />} />
          <Route path="/signupvendor" element={<Sign_up_Vendor />} />
          <Route path="/foodpage" element={<FoodPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
