const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  fromTime: {
    type: String,
    required: true,
  },
  toTime: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const hotelDetailsSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  hotelItems: {
    type: [itemSchema],
    default: [],
  },
});

module.exports = mongoose.model("hotelDetails", hotelDetailsSchema);
