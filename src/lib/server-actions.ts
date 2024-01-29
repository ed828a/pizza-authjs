"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { signIn, signOut } from "./auth";
import { EmailSchema, RegisterSchema } from "./zod-schemas";
import prisma from "./database";
import { generateVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./mailer";
import { AuthError } from "next-auth";

export const logout = async () => {
  await signOut();
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // send verification token email
  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verificationToken.identifier,
    verificationToken.token
  );

  return { success: "Confirmation email sent!" };
};

export const emailLogin = async (
  values: z.infer<typeof EmailSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = EmailSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email } = validatedFields.data;
  console.log("email", email);

  try {
    await signIn("email", { email, redirect: true });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error);
      switch (error.type) {
        case "EmailSignInError":
          return { error: `Email SignIn Error: ${error.message}` };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error; // if not throw error, next-auth doesn't redirect
  }

  return { success: "Email sent!" };
};
