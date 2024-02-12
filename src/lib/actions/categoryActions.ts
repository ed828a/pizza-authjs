"use server";

import { revalidatePath } from "next/cache";
import { CategorySchema } from "../zod-schemas";
import prisma from "@/lib/database";
import { redirect } from "next/navigation";

export const createOrUpdateCategory = async ({
  id,
  name,
}: {
  id?: string | undefined;
  name?: string | undefined;
}) => {
  console.log("createCategory id", id);
  console.log("categoryName", name);
  const validatedFields = CategorySchema.safeParse({ name: name });
  console.log("createCategory result", validatedFields);

  if (!validatedFields.success) {
    console.log("error", validatedFields.error.flatten().fieldErrors);

    return {
      error: "category name is invalid.",
    };
  }

  try {
    let message;
    let returnedCategory;
    if (id) {
      returnedCategory = await prisma.category.update({
        where: { id },
        data: {
          name,
        },
      });

      message = `Category has been updated successfully.`;
    } else {
      returnedCategory = await prisma.category.create({
        data: { name: name as string },
      });
      message = `Category has been created successfully.`;
    }

    revalidatePath("/admin/categories", "page");

    return { message, returnedCategory };
  } catch (error: any) {
    console.log(error);
    return {
      error: `${error.message}`,
    };
  }
};

export const deleteOneCategory = async (id: string) => {
  console.log("deleteOneCategory id", id);

  try {
    await prisma.category.delete({ where: { id } });

    revalidatePath("/admin/categories", "page");

    return { message: "Successfully deleted!" };
  } catch (error) {
    console.log("error", error);
    return { error: "Deleting failed." };
  }
};
