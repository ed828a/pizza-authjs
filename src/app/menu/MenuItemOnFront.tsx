"use client";

import { CartContext } from "@/components/providers/CartContextProvider";
import Image from "next/image";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import AddToCartButton from "./AddToCartButton";
import { Button } from "@/components/ui/button";
import {
  AddonType,
  CartContextType,
  CartItemType,
  MenuItemType,
} from "@/product";

type Props = {
  item: Partial<MenuItemType>;
};

const MenuItemOnFront = ({ item }: Props) => {
  const { image, name, description, basePrice, sizes, extraIngredients } = item;

  const { addToCart } = useContext(CartContext) as CartContextType;
  const [showPopup, setShowPopup] = useState(false);
  const popRef = useRef(null);

  const [selectedSize, setselectedSize] = useState<AddonType | null>(
    sizes?.[0] || null
  );
  const [selectExtras, setSelectExtras] = useState<AddonType[]>([]);

  const handleOutsideClick = (e: any) => {
    if (popRef.current && !(popRef.current as any).contains(e.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleExtraThingClick = (
    ev: ChangeEvent<HTMLInputElement>,
    extra: AddonType
  ) => {
    const checked = ev.target.checked;

    if (checked) {
      setSelectExtras((prev) => {
        const cleanedExtras = prev.filter((ex) => ex.name != extra.name);
        return [...cleanedExtras, extra];
      });
    } else {
      setSelectExtras((prev) => prev.filter((ex) => ex.name != extra.name));
    }
  };

  let selectedPrice = Number(basePrice);
  if (selectedSize) {
    selectedPrice =
      Math.floor(Number(selectedPrice)) +
      Math.floor(Number(selectedSize.price));
  }
  if (selectExtras.length > 0) {
    for (const extra of selectExtras) {
      selectedPrice += Math.floor(Number(extra.price));
    }
  }

  const handleAddToCartButtonClick = async (item: Partial<MenuItemType>) => {
    const cartItem: Partial<CartItemType> = {
      id: item.id as string,
      name: item.name,
      image: item.image,
      description: item.description,
      category: item.category,
      basePrice: item.basePrice,
    };
    console.log("handleAddToCartButtonClick", "showPopup", showPopup);

    if (showPopup) {
      addToCart(cartItem, selectedPrice.toString(), selectedSize, selectExtras);
      toast.success("Added to cart");
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowPopup(false);
    } else {
      const hasNoOptions =
        sizes?.length === 0 && extraIngredients?.length === 0;

      console.log("hasNoOptions", hasNoOptions);
      if (hasNoOptions) {
        addToCart(item, selectedPrice.toString());
        toast.success("Added to cart");
      } else {
        setShowPopup(true);
      }
    }
  };

  const hasSizesOrExtra = sizes?.length! > 0 || extraIngredients?.length! > 0;

  return (
    <div>
      {showPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div
            ref={popRef}
            className="bg-white rounded-lg max-w-md flex flex-col items-center gap-2 overflow-y-scroll no-scrollbar pb-8 pt-4 px-4"
          >
            <Image src={image!} alt={name!} width={300} height={200} />
            <h2 className="text-lg font-bold text-black text-center mb-2">
              {name}
            </h2>
            <p className="text-center text-gray-400 text-sm">{description}</p>
            <div className="w-full">
              {sizes?.length! > 0 && (
                <div className="bg-gray-200 rounded-md p-2">
                  <h3 className="text-black font-semibold">Pick a size</h3>
                  <div className="flex justify-between items-center px-4">
                    {sizes!.map((size) => (
                      <label
                        key={size.name}
                        htmlFor={size.name}
                        className="flex items-center justify-start gap-2 "
                      >
                        <input
                          type="radio"
                          name="size"
                          id={size.name}
                          className="accent-primary dark:accent-primary-foreground"
                          checked={
                            (selectedSize as AddonType)?.name === size.name
                          }
                          onChange={(e) => setselectedSize(size)}
                        />
                        <span className="flex gap-2 ">
                          <span className="text-black">{size.name}</span>
                          <span className="font-semibold text-primary dark:text-primary-foreground ">
                            $
                            {Math.floor(Number(basePrice)) +
                              Math.floor(Number(size.price))}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full">
              {extraIngredients?.length! > 0 && (
                <div className="bg-gray-200 rounded-md p-2 w-full">
                  <h3 className="text-black font-semibold">
                    Pick extra ingredients
                  </h3>
                  <div className="flex justify-between items-center px-4">
                    {extraIngredients!.map((extra) => (
                      <label
                        key={extra.name}
                        htmlFor={extra.name}
                        className="flex items-center justify-start gap-2 "
                      >
                        <input
                          type="checkbox"
                          name={extra.name}
                          id={extra.name}
                          className="accent-primary dark:accent-primary-foreground"
                          onChange={(ev) => handleExtraThingClick(ev, extra)}
                          checked={selectExtras.includes(extra)}
                        />
                        <span className="flex gap-2 ">
                          <span className="text-black">{extra.name}</span>
                          <span className="font-semibold text-primary dark:text-primary-foreground ">
                            +${extra.price}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full flex flex-col gap-2 sticky bottom-0">
              <Button
                onClick={() => handleAddToCartButtonClick(item)}
                className="rounded-lg border border-primary hover:bg-inherit hover:text-primary"
              >
                {/* <FlyingButton
                  targetTop={"5%"}
                  targetLeft={"95%"}
                  src={item.image}
                > */}
                <span>Add to cart ${selectedPrice}</span>
                {/* </FlyingButton> */}
              </Button>

              <Button
                className="rounded-lg border text-gray-600 border-transparent hover:border-primary dark:hover:border-primary-foreground bg-inherit dark:bg-primary dark:text-background hover:text-primary dark:hover:text-primary-foreground hover:bg-inherit"
                type="button"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="h-full group">
        <div className="bg-gray-200 px-4 pb-8 pt-4 rounded-lg text-center hover:bg-white hover:shadow-lg hover:shadow-gray-500 transition-all h-full">
          <div className="h-40">
            <Image
              src={item.image || "/pizza.png"}
              width={200}
              height={137}
              alt="pizza"
              className="mx-auto w-auto h-full block object-contain"
            />
          </div>

          <h4 className="font-semibold text-xl my-3 dark:text-gray-800 group-hover:text-primary dark:group-hover:text-primary-foreground ">
            {item.name || "Pepperoni Pizza"}
          </h4>
          <p className="text-gray-500 text-sm line-clamp-3">
            {item.description ||
              "It was a nest. Not a literal one, but that is what her hair seemed to"}
          </p>

          <AddToCartButton
            hasSizesOrExtra={hasSizesOrExtra}
            basePrice={Number(basePrice)}
            item={item}
            handleAddToCartButtonClick={handleAddToCartButtonClick}
            sizes={sizes!}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItemOnFront;
