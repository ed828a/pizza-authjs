"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { GiFullPizza } from "react-icons/gi";
import { ModeToggleButton } from "./ModeToggleButton";
import AuthButtons from "./AuthButtons";
import Image from "next/image";
import { dancingScript } from "@/lib/utils";
import { BsCart3 } from "react-icons/bs";
import { CartContext } from "../providers/CartContextProvider";
import { CartContextType } from "@/product";
import ToggleButton from "./ToggleButton";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { MdOutlineMenu } from "react-icons/md";

type Props = {};

const TopNavbar = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { cartItems } = useContext(CartContext) as CartContextType;

  console.log("Topbar cartItems", cartItems);

  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/menu",
      label: "Menu",
    },
    {
      href: "/#about",
      label: "About",
    },
    {
      href: "/#contact",
      label: "Contact",
    },
  ];

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) return null;

  const ownerName = "edward";

  return (
    <header className="flex justify-between items-center p-2">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger>
            <MdOutlineMenu className="h-6 md:hidden w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              {routes.map((route, i) => (
                <Link
                  key={i}
                  href={route.href}
                  className="hover:text-primary dark:hover:text-primary-foreground"
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="w-24">
          <Link
            href="/"
            className={"text-primary font-semibold text-2xl flex items-center"}
          >
            <Image
              src={"/images/pizza_shop_logo.png"}
              width={48}
              height={45}
              alt="logo"
              className="h-auto animate-run duration-500"
            />
          </Link>
        </div>

        <Link
          href={"/profile"}
          className={`${dancingScript.className} whitespace-nowrap font-semibold hidden lg:flex gap-4 items-center text-3xl `}
        >
          <span className={``}>Welcome</span>
          <span className="text-primary dark:text-primary-foreground capitalize font-bold text-3xl animate-pulse duration-1000 ">
            {ownerName}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-gray-400 font-semibold ml-12">
          {routes.map((route, i) => (
            <Link
              key={route.label}
              href={route.href}
              className="hover:text-primary dark:hover:text-primary-foreground"
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex justify-center items-center gap-2">
        <Link href={"/cart"} className="relative group mr-2">
          <BsCart3 className="w-8 h-8 group-hover:text-primary" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-3 text-xs bg-primary rounded-full text-white  dark:text-primary-foreground leading-3 px-2 py-1 ">
              {cartItems.length}
            </span>
          )}
        </Link>
        <AuthButtons />
        <ToggleButton />
      </div>
    </header>
  );
};

export default TopNavbar;
