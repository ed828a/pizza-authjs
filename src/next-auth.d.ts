import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export type SettingsUser = {
  name: string | null;
  email: string | null;
  emailVerified: boolean | null;
  image: string | null;
  password: string | null;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

type ProfileType = {
  name: string;
  email: string;
  emailVerified: boolean | null;
  image: string | null;
  phone: string;
  streetAddress: string;
  city: string;
  postcode: string;
  country: string;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

type TProfileState = {
  errors?: {
    name?: string[];
    phone?: string[];
    streetAddress?: string[];
    city?: string[];
    postcode?: string[];
    country?: string[];
    role?: string[];
  };
  message?: string | null;
};
