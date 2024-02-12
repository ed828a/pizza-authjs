import React from "react";
import CategoriesContent from "./CategoriesContent";
import prisma from "@/lib/database";

type Props = {};

const CategoriesPage = async (props: Props) => {
  const categories = await prisma.category.findMany();
  console.log("CategoriesPage categories.length", categories.length);

  return (
    <div className="flex justify-center items-center pt-16">
      <CategoriesContent categories={categories} />
    </div>
  );
};

export default CategoriesPage;
