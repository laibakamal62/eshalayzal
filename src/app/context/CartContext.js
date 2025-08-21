"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const sanitized = parsed.map((item) => ({
          ...item,
          quantity: Number(item.quantity) || 1,
          price: Number(item.price) || 0,
          image: item.image.startsWith("http") || item.image.startsWith("/")
            ? item.image
            : `http://localhost:3000/uploads/products/${item.image}`,
        }));
        setCartItems(sanitized);
      } catch (err) {
        console.error("Error parsing cartItems from localStorage", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity, size, color) => {
    const safeQuantity = Number(quantity) || 1;
    const safePrice = Number(product.price) || 0;
    const imagePath = product.image.startsWith("http")
      ? product.image
      : `http://localhost:3000/uploads/products/${product.image}`;

    setCartItems((prevItems) => {
      
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id &&
          item.size === size &&
          item.color === color
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          title: product.title,
          brand: product.brand,
          price: safePrice,
          image: imagePath,
          quantity: safeQuantity,
          size,
          color,
        },
      ];
    });
  };

  const updateQuantity = (id, size, color, value) => {
    const newQty = Number(value);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: Math.max(1, newQty) }
          : item
      )
    );
  };

  const removeItem = (id, size, color) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color)
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}