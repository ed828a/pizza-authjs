import BackButton from "@/components/auth/BackButton";
import Social from "@/components/auth/Social";
import LoadingSpinner from "@/components/share/LoadingSpinner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn, merriweather } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {};

const SiteLoadingPage = (props: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1
              className={cn("text-3xl font-semibold", merriweather.className)}
            >
              🍕 Protected Routes
            </h1>
            <p className="text-muted-foreground text-sm">Pizza Heaven</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center w-full">
            <LoadingSpinner className="w-24 h-24 text-primary dark:text-primary-foreground" />
          </div>
        </CardContent>

        <CardFooter>
          <Social />
        </CardFooter>
        <CardFooter>
          <BackButton label={"Home"} href={"/"} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default SiteLoadingPage;
