import CardWrapper from "@/components/auth/CardWrapper";
import React from "react";

type Props = {
  searchParams: { error: string };
};

const AuthErrorPage = ({ searchParams: { error } }: Props) => {
  if (error === "Verification") {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CardWrapper
          headerLabel="Unable to sign in"
          backButtonHref="/auth/login"
          backButtonLabel={"Back to sign in"}
        >
          <p className="text-center text-lg mb-4">
            The sign in link is no longer valid.
          </p>
          <p className="text-center">It may have been used already or</p>
          <p className="text-center">it may have expired</p>
        </CardWrapper>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CardWrapper
          headerLabel="Unable to sign in"
          backButtonHref="/auth/login"
          backButtonLabel="Back to sign in"
        >
          <p className="text-center text-lg mb-4">{error}</p>
        </CardWrapper>
      </div>
    );
  }
};

export default AuthErrorPage;
