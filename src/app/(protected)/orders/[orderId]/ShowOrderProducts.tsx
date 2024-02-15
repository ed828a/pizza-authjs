import { cn } from "@/lib/utils";
import { TCartItem } from "@/product";
import { OrderStatus } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  cartProducts: TCartItem[];
  orderStatus: OrderStatus;
};

const ShowOrderProducts = ({ cartProducts, orderStatus }: Props) => {
  let subTotalPrice: number = 0;
  const deliveryFee = cartProducts.length > 0 ? 5 : 0;

  const getSubPrice = (product: any) => {
    let selectedPrice = product.basePrice;
    if (product.size) {
      selectedPrice =
        Math.floor(selectedPrice) + Math.floor(product.size.price);
    }
    if (product.extras.length > 0) {
      for (const extra of product.extras) {
        selectedPrice += Math.floor(extra.price);
      }
    }
    return selectedPrice;
  };

  return (
    <div className="">
      {cartProducts.length === 0 && (
        <div className="">No products in your shopping cart.</div>
      )}
      <h3 className="text-2xl">Order Items</h3>
      {cartProducts.length > 0 &&
        cartProducts.map((product, index) => {
          subTotalPrice += Math.floor(getSubPrice(product));
          return (
            <div
              key={index}
              className="flex items-center gap-4 border-b py-2 mb-4 "
            >
              <div className="w-24">
                <Image width={240} height={240} src={product.image} alt="" />
              </div>
              <div className="grow">
                <div className="font-semibold">{product.name}</div>
                {product.size && (
                  <div className="text-xs text-gray-500">
                    Size: <span>{product.size.name}</span>
                  </div>
                )}
                {typeof product.extras?.length !== "undefined" &&
                  product.extras?.length > 0 && (
                    <div className="flex">
                      <div className="mx-auto">
                        {product.extras.map((extra: any, index: number) => (
                          <div key={index} className="text-xs text-gray-500">
                            extra {extra.name} ${extra.price}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
              <div className="text-lg font-semibold">
                ${product.subPrice || getSubPrice(product)}
              </div>
            </div>
          );
        })}
      <div className="flex justify-end py-4  ">
        <div className="ml-auto flex flex-col gap-y-2 text-lg">
          <div className="flex justify-between gap-8 ">
            <span className="text-gray-500">Subtotal: </span>
            <span className=" font-semibold text-2xl">${subTotalPrice}</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="text-gray-500">Delivery: </span>
            <span className="font-semibold text-2xl">${deliveryFee}</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="text-gray-500">Total: </span>
            <span className="font-semibold text-2xl">
              ${Math.floor(subTotalPrice) + deliveryFee}
            </span>
          </div>
          <div className="w-full border-t border-gray-300" />
          <div className="flex justify-between items-center gap-8 mt-4 ">
            <span className="text-gray-500">Order Status: </span>
            <span
              className={cn("font-semibold text-2xl capitalize", {
                "text-primary": orderStatus === OrderStatus.PENDING,
                "text-green-400": orderStatus === OrderStatus.PAID,
              })}
            >
              {orderStatus === OrderStatus.PAID ? "paid" : "pending"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowOrderProducts;
