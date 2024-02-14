import prisma from "@/lib/database";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaUserAlt } from "react-icons/fa";
import ProfileForm from "@/app/(protected)/profile/ProfileForm";
import { ProfileType } from "@/next-auth";
type Props = {
  params: { id: string };
};

const UserDetails = async ({ params }: Props) => {
  const { id } = params;
  const user = await prisma.user.findUnique({ where: { id } });
  // console.log("UserDetails user", user);
  return (
    <div>
      <Card className=" mt-16 pt-8 pb-16">
        <CardHeader>
          <div className="flex justify-center items-center gap-4">
            <FaUserAlt className="w-8 h-8 " />
            <span className="text-2xl font-semibold text-center">
              User Details
            </span>
          </div>
        </CardHeader>
        <CardContent className="">
          <ProfileForm
            user={user as Partial<ProfileType>}
            callbackUrl="/admin/users"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;
