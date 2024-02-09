import LoginCard from "@/components/auth/LoginCard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {};

const LoginPage = async (props: Props) => {
  const session = await auth();

  if (session && session.user) {
    redirect("/");
  }

  return (
    <section className="pagewrapper">
      <LoginCard />
    </section>
  );
};

export default LoginPage;
