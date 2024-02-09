import ProtectedCardWrapper from "@/components/protected/ProtectedCardWrapper";
import LoadingSpinner from "@/components/share/LoadingSpinner";
import React from "react";

type Props = {};

const ProtectedRoutesLoadingPage = (props: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ProtectedCardWrapper
        headerLabel="Confirm you verification"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
      >
        <div className="flex items-center justify-center w-full">
          <LoadingSpinner className="w-24 h-24 text-primary dark:text-primary-foreground" />
        </div>
      </ProtectedCardWrapper>
    </div>
  );
};

export default ProtectedRoutesLoadingPage;
