import { cn, merriweather } from "@/lib/utils";
import React from "react";

type Props = {
  label: string;
};

const ProtectedHeader = ({ label }: Props) => {
  return (
    <div>
      <div className="w-full flex flex-col gap-y-4 items-center justify-center">
        <h1 className={cn("text-3xl font-semibold", merriweather.className)}>
          🍕 Protected Routes
        </h1>
        <p className="text-muted-foreground text-sm">{label}</p>
      </div>
    </div>
  );
};

export default ProtectedHeader;
