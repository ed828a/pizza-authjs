"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { ThemeContextProvider } from "./ThemeContextProvider";
import { NextAuthSessionProvider } from "./AuthContextProvider";
import CartContextProvider from "./CartContextProvider";

type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContextProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextAuthSessionProvider>
        <CartContextProvider>{children}</CartContextProvider>
      </NextAuthSessionProvider>
    </ThemeContextProvider>
  );
};

export default Providers;
