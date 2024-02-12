"use client";

import Link from "next/link";
import React, { ReactNode } from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
  href: string;
};

const LinkButton = ({ children, href }: Props) => {
  const pathname = usePathname();
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "outline" }),
        "text-primary rounded-full",
        "hover:text-primary hover:border-primary dark:text-primary-foreground dark:hover:border-primary-foreground dark:hover:bg-primary",
        {
          "dark:bg-primary-foreground dark:text-primary bg-primary text-primary-foreground":
            pathname.startsWith(href),
        }
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
