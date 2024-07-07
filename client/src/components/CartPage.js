import React, { useContext } from "react";
import { ItemContext } from "./CartContext";

const CartPage = () => {
  const { cartItems, increaseCount, decreaseCount, removeItem } =
    useContext(ItemContext);

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item._id}>
            <p>
              {item.itemName} - Quantity: {item.quantity} - Price:
              {item.quantity * item.price}
            </p>
            <button onClick={() => increaseCount(item._id)}> + </button>
            <button onClick={() => removeItem(item._id)}> Remove </button>
            <button onClick={() => decreaseCount(item._id)}> - </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
