const mongoose = require("mongoose");

const item = new mongoose.Schema({
  itemName: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  itemId: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const cart = new mongoose.Schema({
  hotelId: {
    type: String,
  },
  userId: {
    type: String,
  },
  items: {
    type: [item],
    default: [],
  },
});

module.exports = mongoose.model("cart", cart);
