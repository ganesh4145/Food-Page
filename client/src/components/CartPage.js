import React, { useContext } from "react";
import { ItemContext } from "./CartContext";

const CartPage = () => {
  const { cartItems, increaseItem, decreaseItem, removeItem, displayItem } =
    useContext(ItemContext);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <h3>Cart is Empty</h3>
      ) : (
        cartItems.map((item) => (
          <div key={item._id}>
            Item - {item.itemName} - Qunatity :{item.quantity} Price:{" "}
            {item.price}
            <button onClick={() => increaseItem(item._id)}>+</button>
            <button onClick={() => removeItem(item._id)}>remove</button>
            <button onClick={() => decreaseItem(item._id)}>-</button>
          </div>
        ))
      )}
      <div>Total Amount:{totalAmount}</div>
      <button onClick={() => displayItem()}>Display</button>
    </div>
  );
};

export default CartPage;
