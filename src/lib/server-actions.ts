"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { signIn, signOut } from "./auth";
import {
  CredentialSigninSchema,
  EmailSchema,
  RegisterSchema,
} from "./zod-schemas";
import prisma from "./database";
import { generateTwoFactorToken, generateVerificationToken } from "./tokens";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "./mailer";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "./routes";

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
    await signIn("email", {
      email,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
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

export const credentialsLogin = async (
  values: z.infer<typeof CredentialSigninSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = CredentialSigninSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "User with this email doesn't exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    // send email with verificationToken
    await sendVerificationEmail(email, verificationToken.token);

    return { success: "Confirmation Email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await prisma.twoFactorToken.findFirst({
        where: { email: existingUser.email },
      });

      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Code mismatched!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        // delete expired token
        await prisma.twoFactorToken.delete({
          where: { id: twoFactorToken.id },
        });

        return { error: "Code expired!" };
      }

      // when 2FA is valid, still remove twoFactorToken
      await prisma.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

      const existingConfirmation =
        await prisma.twoFactorConfirmation.findUnique({
          where: { userId: existingUser.id },
        });

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error; // if not throw error, next-auth doesn't redirect
  }

  return { success: "Email sent!" };
};
