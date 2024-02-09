"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { TProfileState } from "@/next-auth";
import { UserRole } from "@prisma/client";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])$/
);
const postcodeRegex = new RegExp(/^[0-9]{4}$/);

const ProfileSchema = z.object({
  name: z
    .string()
    .min(3, { message: "name must be at least 3 characters long." }),
  phone: z.string().regex(phoneRegex, "Invalid Number!"),
  streetAddress: z
    .string()
    .min(3, { message: "streetAddress must be at least 3 characters long." }),
  city: z
    .string()
    .min(3, { message: "city must be at least 3 characters long." }),
  postcode: z.string().regex(postcodeRegex, "Invalid postcode!"),
  country: z
    .string()
    .min(3, { message: "country must be at least 3 characters long." }),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  isTwoFactorEnabled: z.optional(z.boolean()),
});

export async function updateProfileAction(
  callbackUrl: string,
  email: string,
  prevState: TProfileState,
  formData: FormData
) {
  // Test it out:
  console.log("updateProfileAction formData", formData);
  const rawFormData = Object.fromEntries(formData.entries());
  console.log("updateProfileAction rawFormData", rawFormData);

  // safeParse() will return an object containing either a success or error field.
  const validatedFields = ProfileSchema.safeParse({
    name: formData.get("userName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    streetAddress: formData.get("streetAddress"),
    city: formData.get("city"),
    postcode: formData.get("postcode"),
    country: formData.get("country"),
    role: formData.get("role"),
    isTwoFactorEnabled: formData.get("isTwoFactorEnabled") === "on",
  });

  console.log("validatedFields ", validatedFields);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(
      "validatedFields error",
      validatedFields.error.flatten().fieldErrors
    );

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update profile.",
    };
  }

  console.log("validatedFields.data", validatedFields.data);
  console.log("email", email);
  try {
    const user = await prisma?.user.update({
      where: { email },
      data: { ...validatedFields.data },
    });

    console.log("updateProfileAction updated user", user);
  } catch (error) {
    console.log("error", error);

    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to update profile.",
    };
  }

  console.log("callbackUrl", callbackUrl);

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(callbackUrl);
  redirect(callbackUrl); // this is from throw exceptions
}
