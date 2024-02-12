import * as React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import LoadingSpinner from "./LoadingSpinner";

export interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    { children, className, disabled = false, isLoading = false, ...props },
    ref
  ) => {
    return (
      <div className="relative">
        <Button className={className} ref={ref} disabled={disabled} {...props}>
          {isLoading && <LoadingSpinner className="w-6 h-6 mr-2" />}
          {children}
        </Button>
      </div>
    );
  }
);
LoadingButton.displayName = "Button";

export default LoadingButton;
