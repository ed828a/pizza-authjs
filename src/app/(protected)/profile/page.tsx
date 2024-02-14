import React from "react";
import { auth, signOut } from "@/lib/auth";
import prisma from "@/lib/database";
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";
import { ProfileType } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CgProfile } from "react-icons/cg";

type Props = {};

const ProfilePage = async (props: Props) => {
  const session = await auth();
  console.log("ProfilePage session", session);

  if (!session) {
    redirect("/auth/login?error=unauthenticated");
  }

  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });

  if (!user) {
    await signOut();
  }

  return (
    <div className="flex justify-center">
      <Card className="mt-16 pt-8 pb-16">
        <CardHeader>
          <div className="flex justify-center items-center gap-4">
            <CgProfile className="w-8 h-8 " />
            <span className="text-2xl font-semibold text-center">Profile</span>
          </div>
        </CardHeader>
        <CardContent className="">
          <ProfileForm user={user as Partial<ProfileType>} callbackUrl="/" />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
