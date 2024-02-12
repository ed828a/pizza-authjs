"use client";
import React, { ReactNode, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

const BasicModal = ({ open, onClose, children }: Props) => {
  return (
    <div
      onClick={onClose}
      className={`
      fixed inset-0 flex justify-center items-center transition-colors
      ${open ? "visible bg-black/70" : "invisible"}
    `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
        bg-white rounded-xl shadow p-6 transition-all
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
      `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 "
        >
          <HiOutlineXMark
            width={64}
            height={64}
            className="w-6 h-6 hover:text-primary dark:hover:text-primary-foreground"
          />
        </button>
        {children}
      </div>
    </div>
  );
};

export default BasicModal;
