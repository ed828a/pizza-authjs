import { auth } from "@/lib/auth";
import React from "react";
import prisma from "@/lib/database";
import { ProfileType } from "@/next-auth";
import CartContent from "./CartContent";

type Props = {};

const CartPage = async (props: Props) => {
  const session = await auth();
  let profile: Partial<ProfileType> | undefined;

  if (session) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });
    profile = {
      name: user?.name ?? "",
      email: user?.email ?? "",
      image: user?.image ?? "",
      phone: user?.phone ?? "",
      streetAddress: user?.streetAddress ?? "",
      city: user?.city ?? "",
      postcode: user?.postcode ?? "",
      country: user?.country ?? "",
    };
  }

  return (
    <div className="flex justify-center items-center pt-16">
      <CartContent profile={profile} />
    </div>
  );
};

export default CartPage;
