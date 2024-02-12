import React from "react";
import CreateMenuItemLink from "./CreateMenuItemLink";
import prisma from "@/lib/database";
import MenuItemList from "./MenuItemList";
import Pagination from "./Pagination";

type Props = {
  searchParams?: { query?: string; page?: string };
};

const MenuItemsPage = async ({ searchParams }: Props) => {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 9;
  const skip = (currentPage - 1) * limit;

  const [menuItems, totalCount] = await Promise.all([
    prisma.menuItem.findMany({
      orderBy: {
        categoryName: "desc",
      },
      take: limit,
      skip: skip,
    }),
    prisma.menuItem.count(),
  ]);

  const totalPages = Math.ceil(Number(totalCount) / limit);

  return (
    <div className="flex flex-col justify-center items-center ">
      <CreateMenuItemLink />
      <MenuItemList menuItems={menuItems} page={searchParams?.page} />
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default MenuItemsPage;
