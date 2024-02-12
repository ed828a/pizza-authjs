import React from "react";
import ShowAllMenuItemsLink from "../ShowAllMenuItemsLink";
import MenuItemDetails from "./MenuItemDetails";
import prisma from "@/lib/database";

type Props = {};

const CreateNewItemPage = async (props: Props) => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "desc" },
  });

  return (
    <div className="flex flex-col justify-center items-center ">
      <ShowAllMenuItemsLink />
      <MenuItemDetails categories={categories} />
    </div>
  );
};

export default CreateNewItemPage;
