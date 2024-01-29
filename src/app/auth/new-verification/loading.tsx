import CardWrapper from "@/components/auth/CardWrapper";
import LoadingSpinner from "@/components/share/LoadingSpinner";
import React from "react";

type Props = {};

const NewVerificationPageLoading = (props: Props) => {
  return (
    <CardWrapper
      headerLabel="Confirm you verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        <LoadingSpinner className="w-24 h-24 text-primary" />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationPageLoading;
