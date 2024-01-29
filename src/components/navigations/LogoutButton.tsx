"use client";

import { logout } from "@/lib/server-actions";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const LogoutButton = ({ children }: Props) => {
  const onClick = async () => {
    await logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutButton;
