import React, { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import ProtectedHeader from "./ProtectedHeader";
import Social from "../auth/Social";
import BackButton from "../auth/BackButton";

type Props = {
  children: ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

const ProtectedCardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: Props) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <ProtectedHeader label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default ProtectedCardWrapper;
