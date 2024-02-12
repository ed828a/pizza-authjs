import Link from "next/link";
import React from "react";
import { GiFullPizza } from "react-icons/gi";
import { ModeToggleButton } from "./ModeToggleButton";
import AuthButtons from "./AuthButtons";
import Image from "next/image";
import { dancingScript } from "@/lib/utils";
import { BsCart3 } from "react-icons/bs";

type Props = {};

const TopNavbar = (props: Props) => {
  const ownerName = "edward";

  return (
    <header className="flex justify-between items-center p-2">
      <div className="flex items-center">
        <div className="w-24">
          <Link
            href="/"
            className={"text-primary font-semibold text-2xl flex items-center"}
          >
            <Image
              src={"/images/pizza_shop_logo.png"}
              width={48}
              height={48}
              alt="logo"
              className="animate-run duration-500"
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
          <Link
            href="/"
            className="hover:text-primary dark:hover:text-primary-foreground"
          >
            Home
          </Link>
          <Link
            className="hover:text-primary dark:hover:text-primary-foreground"
            href="/menu"
          >
            Menu
          </Link>
          <Link
            className="hover:text-primary dark:hover:text-primary-foreground"
            href="/#about"
          >
            About
          </Link>
          <Link
            className="hover:text-primary dark:hover:text-primary-foreground"
            href="/#contact"
          >
            Contact
          </Link>
        </nav>
      </div>

      <div className="flex justify-center items-center gap-2">
        <Link href={"/cart"} className="relative group mr-2">
          <BsCart3 className="w-8 h-8 group-hover:text-primary" />
          {/* {cartProducts.length > 0 && (
            <span className="absolute -top-1 -right-3 text-xs bg-primary rounded-full text-white leading-3 px-2 py-1 ">
              {cartProducts.length}
            </span>
          )} */}
          <span className="absolute -top-1 -right-3 text-xs bg-primary dark:bg-primary rounded-full text-white dark:text-primary-foreground leading-3 px-2 py-1 ">
            7
          </span>
        </Link>
        <AuthButtons />
        <ModeToggleButton />
      </div>
    </header>
  );
};

export default TopNavbar;
