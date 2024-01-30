import CardWrapper from "@/components/auth/CardWrapper";
import LoadingSpinner from "@/components/share/LoadingSpinner";
import React from "react";

type Props = {};

const NewVerificationPageLoading = (props: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center shadow-2xl">
      <CardWrapper
        headerLabel="Confirm you verification"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
      >
        <div className="flex items-center justify-center w-full">
          <LoadingSpinner className="w-24 h-24 text-primary dark:text-primary-foreground" />
        </div>
      </CardWrapper>
    </div>
  );
};

export default NewVerificationPageLoading;