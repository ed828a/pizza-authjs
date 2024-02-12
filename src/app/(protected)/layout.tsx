import ProtectedNav from "@/components/protected/ProtectedNav";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = { children: React.ReactNode };

const ProtectedRoutesLayout = async ({ children }: Props) => {
  const session = await auth();

  if (!session || !session.user) {
    return redirect("/auth/signin");
  }

  const admin = session.user.role === "ADMIN";

  return (
    <div>
      <ProtectedNav admin={admin} />
      {children}
    </div>
  );
};

export default ProtectedRoutesLayout;
