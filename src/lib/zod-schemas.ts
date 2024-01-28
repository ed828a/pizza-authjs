import * as z from "zod";

export const CredentialSigninSchema = z.object({
  email: z.string().email({ message: "Email is required." }),
  password: z.string().min(1, { message: "Password is required" }), // no need to limit the length here, should be  in register
  code: z.optional(z.string()),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(6, {
      message: "Minimum 6 characters required",
    })
    .max(50, "password is too long!"),
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(50, "Name is too long!"),
});
