"use client";

import { register } from "@/lib/server-actions";
import { RegisterSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Header from "./Header";
import Social from "./Social";
import EmailLoginForm from "./EmailLoginForm";
import BackButton from "./BackButton";
import RegisterForm from "./RegisterForm";

type Props = {};

const RegisterCard = (props: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    // reset states
    setErrorMessage("");
    setSuccessMessage("");

    startTransition(() => {
      register(values).then((data) => {
        if (data?.error) setErrorMessage(data.error);
        if (data?.success) setSuccessMessage(data.success);
      });
    });
  };

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={"Create an account"} />
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>

      <CardFooter className="mt-4 flex flex-col">
        <div className=" w-full  px-2 flex">
          <span className="border-t grow" />
          <span className="text-center text-xs -mt-2 bg-inherit opacity-100">
            Or log in with email, google or github
          </span>
          <span className="border-t grow" />
        </div>
        <div className="flex flex-col w-full gap-6">
          <EmailLoginForm />
          <Social />
        </div>
      </CardFooter>

      <CardFooter>
        <BackButton label={"Already have an account?"} href={"/login"} />
      </CardFooter>
    </Card>
  );
};

export default RegisterCard;
