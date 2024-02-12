import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import React from "react";

type Props = {};

const CreateMenuItemLink = (props: Props) => {
  return (
    <div className="group ">
      <div className="xs:min-w-[320px] md:min-w-[512px] mx-auto">
        <Link
          href={"/admin/menu-items/new-item"}
          className="flex justify-center gap-8 w-full text-gray-700 font-semibold border border-gray-300 hover:border-primary rounded-xl px-6 py-2 dark:group-hover:border-primary-foreground dark:group-hover:text-primary-foreground "
        >
          <span className="group-hover:text-primary dark:text-gray-300 dark:group-hover:border-primary-foreground dark:group-hover:text-primary-foreground">
            Create new menu item
          </span>
          <FaArrowRight className="w-6 h-6 border-2 rounded-full border-gray-400 group-hover:border-primary group-hover:text-primary dark:text-gray-300 dark:group-hover:border-primary-foreground dark:group-hover:text-primary-foreground " />
        </Link>
      </div>
    </div>
  );
};

export default CreateMenuItemLink;
