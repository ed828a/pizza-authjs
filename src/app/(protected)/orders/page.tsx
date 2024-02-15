import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/database";
import { OrderStatus, UserRole } from "@prisma/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn, formatTime } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type Props = {};

const OrderListPage = async (props: Props) => {
  const session = await auth();
  console.log("OrderListPage session", session);

  if (!session) {
    redirect("/api/auth/signin");
  }

  let orders;
  if (session.user.role === UserRole.USER) {
    orders = await prisma.order.findMany({
      where: { purchaserEmail: session.user.email! },
    });
  } else if (session.user.role === UserRole.ADMIN) {
    orders = await prisma.order.findMany({
      orderBy: { purchaserEmail: "asc" },
    });
  }

  if (!orders) {
    return (
      <div className="flex justify-center items-center pt-16">
        <Alert className="max-w-2xl h-56 flex flex-col justify-between p-12 bg-gray-100">
          <div className="flex justify-center items-center gap-2 ">
            <RocketIcon className="h-4 w-4" style={{ color: "#ff0000" }} />
            <AlertTitle className="text-primary font-semibold text-2xl">
              Alert!
            </AlertTitle>
          </div>
          <AlertDescription className="text-center text-xl mb-4">
            Not found any orders, please check later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center pt-16">
      <div className="">
        <h1 className="text-2xl font-semibold mb-2">Orders</h1>
        {orders.length > 0 &&
          orders.map((order: any) => (
            <div
              className="bg-gray-100 dark:bg-inherit mb-2 p-4 rounded-lg grid grid-cols-4 sm:grid-cols-5"
              key={order.id}
            >
              <div className="col-span-2 flex flex-col sm:flex-row">
                <div className="">
                  {order.purchaserEmail !== session.user.email &&
                    order.purchaserEmail}
                </div>
                <div className="text-gray-500 dark:text-primary/70">
                  {order.purchasedItems.map((p: any) => p.name).join(", ")}
                </div>
              </div>
              <div className="col-span-2 sm:col-span-3 flex flex-col sm:flex-row gap-2 justify-center items-center">
                <div className="flex items-center justify-end ">
                  <span
                    className={cn(
                      "px-4 py-1 rounded-md text-white capitalize w-[100px] text-center",
                      {
                        "bg-green-500 border-green-500":
                          order.status === OrderStatus.PAID,
                        "bg-red-500 border-primary":
                          order.status === OrderStatus.PENDING,
                      }
                    )}
                  >
                    {order.status === OrderStatus.PAID ? "paid" : "pending"}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <div className="flex flex-col items-end justify-center">
                    {formatTime(order.createdAt).date}
                  </div>
                  <div className="flex flex-col items-end justify-center">
                    {formatTime(order.createdAt).time}
                  </div>
                </div>
                <div className="text-center px-2 flex justify-end items-center">
                  <Link
                    href={`/orders/${order.id}`}
                    className={cn(
                      "text-center border px-2 py-1 rounded-lg font-bold ",
                      buttonVariants({ variant: "outline" }),
                      "hover:border-primary hover:text-primary"
                    )}
                  >
                    Show order
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderListPage;
