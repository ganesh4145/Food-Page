import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login_Page from "./components/Login_Page";
import Home from "./components/Home";
import Sign_Up from "./components/Sign_Up";
import FoodPage from "./components/FoodPage";
import ForgotPassword from "./components/ForgotPassword";
import VendorPage from "./components/VendorPage";
import PrivateRouter from "./components/PrivateRouter";
import AddMenuItem from "./components/vendor/AddMenuItem";
import HotelItemPage from "./components/HotelItemPage";
import CartPage from "./components/CartPage";
import { CartContextProvider } from "./components/CartContext";

function App() {
  const loginPrev = localStorage.getItem("LoggedIn");
  const userType = localStorage.getItem("ty");

  return (
    <CartContextProvider>
      <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                loginPrev === "true" ? (
                  userType === "Buyer" ? (
                    <FoodPage />
                  ) : (
                    <VendorPage />
                  )
                ) : (
                  <Home />
                )
              }
            />
            <Route path="/login" element={<Login_Page />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route
              path="/foodpage"
              element={<PrivateRouter element={<FoodPage />} />}
            />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/vendorpage"
              element={<PrivateRouter element={<VendorPage />} />}
            />
            <Route path="/addItemMenu" element={<AddMenuItem />} />
            <Route path="/hotelList/:hotelId" element={<HotelItemPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Router>
    </CartContextProvider>
  );
}

export default App;
