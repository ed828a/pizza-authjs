import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import prisma from "@/lib/database";
import { RocketIcon } from "@radix-ui/react-icons";
import ClearCart from "./ClearCart";
import OrderDetailsContent from "./OrderDetailsContent";
import { CartItemType, OrderType } from "@/product";

type Props = {
  params: {
    orderId: string;
  };
  searchParams: {
    "clear-cart"?: string;
    cancelled: string;
  };
};

const OrderDetailsPage = async ({ params, searchParams }: Props) => {
  const clearCart = searchParams["clear-cart"] === "1";
  const orderId = params.orderId;
  console.log("orderId", orderId);
  console.log("searchParams", searchParams);

  const order = await prisma.order.findUnique({ where: { id: orderId } });

  console.log("OrderDetailsPage order", order);

  if (!order) {
    return (
      <section className="section">
        <Alert className="max-w-2xl h-56 flex flex-col justify-between p-12 bg-gray-100 dark:bg-inherit ">
          <div className="flex justify-center items-center gap-2 ">
            <RocketIcon className="h-4 w-4" style={{ color: "#ff0000" }} />
            <AlertTitle className="text-primary dark:text-primary-foreground font-semibold text-2xl">
              Alert!
            </AlertTitle>
          </div>
          <AlertDescription className="text-center text-xl mb-4">
            Not found the order, please check the order id.
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  return (
    <div>
      <OrderDetailsContent
        order={{
          purchaserEmail: order.purchaserEmail,
          phone: order.phone!,
          streetAddress: order.streetAddress!,
          city: order.city!,
          postcode: order.postcode!,
          country: order.country!,
          purchasedItems: order.purchasedItems as CartItemType[],
          status: order.status,
        }}
      />
      <ClearCart />
    </div>
  );
};

export default OrderDetailsPage;
