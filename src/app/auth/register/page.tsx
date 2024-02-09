import RegisterCard from "@/components/auth/RegisterCard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {};

const RegisterPage = async (props: Props) => {
  const session = await auth();

  if (session && session.user) {
    redirect("/");
  }

  return (
    <div className="pagewrapper">
      <RegisterCard />
    </div>
  );
};

export default RegisterPage;
