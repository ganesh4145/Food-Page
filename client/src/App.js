import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login_Page from "./components/Login_Page";
import Home from "./components/Home";
import Sign_Up from "./components/Sign_Up";
import FoodPage from "./components/FoodPage";
import ForgotPassword from "./components/ForgotPassword";
import VendorPage from "./components/VendorPage";
import AddMenuItem from "./components/vendor/AddMenuItem";
import HotelItemPage from "./components/HotelItemPage";
import CartPage from "./components/CartPage";
import UpdateAndDeleteItem from "./components/vendor/UpdateAndDeleteItem";
import PrivateRouter from "./components/PrivateRouter";

function App() {
  const loginPrev = localStorage.getItem("LoggedIn");
  const userType = localStorage.getItem("ty");

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              loginPrev === "true" ? (
                userType === "Buyer" ? (
                  <Navigate to="/foodpage" />
                ) : (
                  <Navigate to="/vendorpage" />
                )
              ) : (
                <Home />
              )
            }
          />
          <Route path="/login" element={<Login_Page />} />
          <Route path="/signup" element={<Sign_Up />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route
            path="/foodpage"
            element={<PrivateRouter element={<FoodPage />} />}
          />
          <Route
            path="/vendorpage"
            element={<PrivateRouter element={<VendorPage />} />}
          />
          <Route
            path="/addItemMenu"
            element={<PrivateRouter element={<AddMenuItem />} />}
          />
          <Route
            path="/hotelList/:hotelId"
            element={<PrivateRouter element={<HotelItemPage />} />}
          />
          <Route
            path="/cart"
            element={<PrivateRouter element={<CartPage />} />}
          />
          <Route
            path="/updateitem"
            element={<PrivateRouter element={<UpdateAndDeleteItem />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
