import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AdminRoutesLayout = async ({ children }: Props) => {
  const session = await auth();
  console.log("AdminRoutesLayout session", session);

  if (!session || session.user.role !== "ADMIN") {
    redirect(`/auth/login?error=unauthenticated`);
  }
  return (
    <section className="w-full grow flex justify-center items-center">
      {children}
    </section>
  );
};

export default AdminRoutesLayout;
