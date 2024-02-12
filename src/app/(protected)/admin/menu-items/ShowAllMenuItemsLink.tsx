import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import React from "react";

type Props = {};

const ShowAllMenuItemsLink = (props: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 xs:min-w-[320px] md:min-w-[512px] mx-auto">
      <div className="group w-full">
        <Link
          href={"/admin/menu-items"}
          className="flex justify-center gap-8 w-full text-gray-700 group-hover:text-primary font-semibold border border-gray-300 group-hover:border-primary rounded-xl px-6 py-2 dark:text-gray-300 dark:group-hover:border-primary-foreground dark:group-hover:text-primary-foreground"
        >
          <FaArrowLeft className="w-6 h-6 rounded-full border-2 border-gray-400 group-hover:border-primary group-hover:text-primary dark:group-hover:border-primary-foreground dark:group-hover:text-primary-foreground  " />
          <span className="dark:group-hover:border-primary-foreground dark:group-hover:text-primary-foreground group-hover:text-primary dark:text-gray-300">
            Show all menu items
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ShowAllMenuItemsLink;
