"use server";

import prisma from "@/lib/database";
import { MenuItemTypeSchema } from "../zod-schemas";

export const createMenuItem = async (menuItem: MenuItemType) => {
  console.log("createMenuItem menuItem", menuItem);
  const validatedFields = MenuItemTypeSchema.safeParse(menuItem);

  if (!validatedFields.success) {
    return { error: "menuItem is invalid." };
  }

  const createdMenuItem = await prisma.menuItem.create({
    data: {
      name: menuItem.name,
      basePrice: menuItem.basePrice,
      description: menuItem.description,
      bestSeller: menuItem.bestSeller,
      image: menuItem.image,
      categoryName: menuItem.category,
      extraIngredients: menuItem.extraIngredients,
      sizes: menuItem.sizes,
    },
  });
  console.log("createdMenuItem", createdMenuItem);
  return { createdMenuItem, message: "menuItem created successfully." };
};
