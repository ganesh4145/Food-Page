const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
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
    required: true,
  },
  hotelItems: {
    type: [itemSchema],
    default: [],
  },
});

module.exports = mongoose.model("hotelDetails", hotelDetailsSchema);
