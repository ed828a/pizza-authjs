"use client";

import { CartContext } from "@/components/providers/CartContextProvider";
import { CartContextType } from "@/product";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect } from "react";

type Props = {};

const ClearCart = (props: Props) => {
  const searchParams = useSearchParams();
  const ShouldClearCart = Boolean(searchParams.get("clear-cart"));
  const { clearCart } = useContext(CartContext) as CartContextType;
  console.log("clearCart", ShouldClearCart);

  useEffect(() => {
    if (
      typeof window.console !== "undefined" &&
      window.location.href.includes("clear-cart")
    ) {
      clearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default ClearCart;
