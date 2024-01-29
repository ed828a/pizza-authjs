import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";

import GoogleProvider from "next-auth/providers/google";
import authConfig from "./auth.config";
import prisma from "./database";

import { CredentialSigninSchema } from "./zod-schemas";
import { html, text } from "./utils";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "UserEmail", type: "email", placeholder: "your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = CredentialSigninSchema.safeParse(credentials);
        console.log("validatedFields", validatedFields);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await prisma.user.findUnique({ where: { email } });

          if (!user || !user.password) {
            return null; // means authentication failed.
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
    EmailProvider({
      id: "email",
      name: "email",
      server: {
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.GOOGLE_USER_EMAIL,
          pass: process.env.GOOGLE_USER_APP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        //THIS IS FOR EMAIL CUSTOMIZATION
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const { host } = new URL(url);
        const transport = nodemailer.createTransport(server);
        await transport.sendMail({
          to: email,
          from,
          subject: `Login to ${host}`,
          text: text({ url, host }),
          html: html({ url, host, email, label: "Sign in" }),
        });
      },
    }),
    GitHubProvider,
    GoogleProvider,
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
});
