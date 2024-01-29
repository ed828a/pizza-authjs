"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AvatarIcon, ExitIcon } from "@radix-ui/react-icons";
import { FaRegUser } from "react-icons/fa";
import { useSession } from "next-auth/react";
import LogoutButton from "./LogoutButton";

type Props = {};

const UserButton = (props: Props) => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="">
        <Avatar>
          <AvatarImage src={session?.user?.image || ""} />
          <AvatarFallback className="bg-primary dark:bg-primary-foreground">
            {/* <AvatarIcon className="w-8 h-8 text-white" /> */}
            <FaRegUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem className="dark:hover:text-primary-foreground dark:hover:border-primary-foreground dark:hover:border dark:hover:bg-primary">
            <ExitIcon className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
