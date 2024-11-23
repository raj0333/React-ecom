import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(product => product.id !== id));
  };

  const totalValue = cart.reduce((acc, product) => acc + product.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalValue }}>
      {children}
    </CartContext.Provider>
  );
}
