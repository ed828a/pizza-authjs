"use client";

import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  hasSizesOrExtra: boolean;
  basePrice: number;
  item: Partial<MenuItemType>;
  handleAddToCartButtonClick: (item: Partial<MenuItemType>) => void;
  sizes: AddonType[];
};

const AddToCartButton = ({
  hasSizesOrExtra,
  basePrice,
  item,
  handleAddToCartButtonClick,
  sizes,
}: Props) => {
  return hasSizesOrExtra ? (
    <div className="">
      <Button
        type="button"
        onClick={() => handleAddToCartButtonClick(item)}
        className="mt-4 bg-primary text-white border border-primary rounded-full px-8 py-2 hover:bg-inherit hover:text-primary"
      >
        {hasSizesOrExtra ? (
          <span>
            Add to cart (from $
            {Math.floor(basePrice) + Math.floor(Number(sizes?.[0]?.price))})
          </span>
        ) : (
          <span>Add to cart ${basePrice}</span>
        )}
      </Button>
    </div>
  ) : (
    <div className="group">
      <Button
        onClick={() => handleAddToCartButtonClick(item)}
        className="mt-4 rounded-full px-8 border border-primary hover:bg-inherit hover:text-primary"
      >
        <span>Add to cart ${basePrice}</span>
      </Button>
    </div>
  );
};

export default AddToCartButton;
