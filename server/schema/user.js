const mongoose = require("mongoose");

const userDetails = new mongoose.Schema({
  name: {
    type: String,
    requires: true,
  },
  phoneNumber: {
    type: String,
    requires: true,
    unique: true,
  },
  email: {
    type: String,
    requires: true,
    unique: true,
  },
  password: {
    type: String,
    requires: true,
  },
  address: {
    type: String,
    requires: true,
  },
  currentCity: {
    type: String,
    requires: true,
  },
});

module.exports = mongoose.model("userRegisterFoodPage", userDetails);
