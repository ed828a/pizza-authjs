"use client";

import { CartContextType, TAddon, TCartItem } from "@/product";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext<CartContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const CartContextProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const getLocatStorage = () =>
    typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    const ls = getLocatStorage();
    if (ls) {
      const cartItems = ls.getItem("cart");
      if (cartItems) {
        setCartItems(JSON.parse(cartItems));
      }
    }
  }, []);

  const saveCartToLocalStorage = (cartItems: any[]) => {
    const ls = getLocatStorage();
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartItems));
    }
  };

  const clearCart = () => {
    setCartItems([]);
    const ls = getLocatStorage();
    if (ls) {
      ls.removeItem("cart");
    }
  };

  function addToCart(
    item: Partial<TCartItem>,
    subPrice: string,
    size: TAddon | null = null,
    extras: TAddon[] = []
  ) {
    setCartItems((prev) => {
      const cartItem = { ...item, size, extras, subPrice };
      const newCartItems = [...prev, cartItem];
      saveCartToLocalStorage(newCartItems);
      return newCartItems;
    });
  }

  const removeOneItemOutOfCart = (indexToRemove: number) => {
    setCartItems((prev) => {
      const newCardItems = prev.filter((v, index) => index !== indexToRemove);
      saveCartToLocalStorage(newCardItems);

      return newCardItems;
    });

    toast.success("The item removed!");
  };

  console.log("CartContextProvider cartItems", cartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeOneItemOutOfCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
