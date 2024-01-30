import CardWrapper from "@/components/auth/CardWrapper";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import React from "react";

type Props = {};

const NewPasswordPage = (props: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <CardWrapper
        headerLabel="Enter a new password"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
      >
        <NewPasswordForm />
      </CardWrapper>
    </div>
  );
};

export default NewPasswordPage;
