import { createContext, React, useContext, useState } from "react";

export const ItemContext = createContext(null);

export const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItem) => {
      const itemIndex = prevItem.findIndex((i) => i._id === item._id);

      if (itemIndex !== -1) {
        const newItem = [...prevItem];
        newItem[itemIndex].quantity += 1;
        return newItem;
      }
      return [...prevItem, { ...item, quantity: 1 }];
    });
  };

  const increaseItem = (itemId) => {
    setCartItems((prevItem) =>
      prevItem.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseItem = (itemId) => {
    setCartItems((prevItem) =>
      prevItem.map((item) =>
        item._id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems((prevItem) => prevItem.filter((item) => item._id !== itemId));
  };

  const displayItem = () => {
    console.log(`Cart Items: ${JSON.stringify(cartItems, null, 2)}`);
  };

  const getCartCount = () => {
    console.log(`count`);
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const contextValue = {
    addToCart,
    cartItems,
    increaseItem,
    decreaseItem,
    removeItem,
    displayItem,
    getCartCount,
  };

  return (
    <ItemContext.Provider value={contextValue}>
      {props.children}
    </ItemContext.Provider>
  );
};
