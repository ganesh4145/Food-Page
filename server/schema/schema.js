const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: false,
  },
  fromTime: {
    type: String,
  },
  toTime: {
    type: String,
  },
  quantity: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: false,
  },
});

const hotelDetailsSchema = new mongoose.Schema({
  hotelName: {
    type: String,
  },
  hotelId: {
    type: String,
  },
  hotelItems: {
    type: [itemSchema],
    default: [],
  },
});

module.exports = mongoose.model("hotelDetails", hotelDetailsSchema);
