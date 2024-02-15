"use client";

import { GoPlus } from "react-icons/go";
import React, { useEffect, useState } from "react";
import {
  MdKeyboardArrowUp as Up,
  MdKeyboardArrowDown as Down,
} from "react-icons/md";

import { cn } from "@/lib/utils";

import AddonItem from "./AddonItem";
import { Button } from "@/components/ui/button";
import { TAddon, TMenuItem } from "@/product";

type Props = {
  addonName: string;
  addonLabel: string;
  setMenuItem: React.Dispatch<any>;
  menuItem: TMenuItem | null;
  reset: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuItemAddons = ({
  addonName,
  addonLabel,
  setMenuItem,
  menuItem,
  reset,
  setReset,
}: Props) => {
  // console.log("MenuItemAddons menuItem", menuItem);
  // console.log("addonName", addonName);
  let init: TAddon[] = [];
  if (addonName === "sizes" && menuItem && menuItem.sizes.length > 0) {
    init = menuItem.sizes;
  } else if (
    addonName === "extraIngredients" &&
    menuItem &&
    menuItem.extraIngredients.length > 0
  ) {
    init = menuItem.extraIngredients;
  }

  const [addons, setAddons] = useState<TAddon[]>(init);
  const [isOpen, setIsOpen] = useState(true);

  // console.log("MenuItemAddons init", init);
  // console.log("MenuItemAddons addons", addons);

  useEffect(() => {
    setMenuItem((prev: any) => ({ ...prev, [addonName]: addons }));
  }, [addons]);

  useEffect(() => {
    console.log("MenuItemAddons reset", reset);
    if (reset) {
      setAddons([]);
    }
  }, [reset]);

  const addAddon = ({ name, price }: TAddon) => {
    setAddons((prev: TAddon[]) => [...prev, { name, price }]);
  };

  function editAddon(
    ev: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void {
    setAddons((prev: TAddon[]) => {
      const newSizes = [...prev];
      const a = newSizes[index];
      newSizes[index] = { ...a, [ev.target.name]: ev.target.value };
      console.log("newSize", newSizes);
      return newSizes;
    });
    console.log(ev.target.name, ev.target.value);
  }

  function removeAddon(index: number) {
    //@ts-expect-error
    setAddons((prev: any) => prev.filter((v, i: number) => i !== index));
  }

  console.log("MenuItemAddons called", addons, "reset", reset);

  return (
    <div className="bg-gray-200 dark:bg-inherit p-2 rounded-md mb-2">
      <div className="flex items-center gap-2 ">
        <span
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-0 bg-white rounded-full shadow-md hover:cursor-pointer "
        >
          <Up
            className={cn(
              "w-4 h-4 transition-all duration-500 dark:text-gray-700",
              {
                "rotate-180": !isOpen,
              }
            )}
          />
        </span>

        <span className="text-gray-500 font-semibold capitalize  ">
          {addonName}
        </span>
        <span className="dark:text-primary">({addons?.length})</span>
      </div>
      <div className={cn("transition-all", { hidden: !isOpen })}>
        {addons &&
          addons?.length > 0 &&
          addons.map((size: TAddon, index) => (
            <AddonItem
              addon={size}
              addonLabel={addonLabel}
              className="flex gap-2 items-center"
              editAddon={editAddon}
              removeAddon={removeAddon}
              index={index}
              key={index}
            />
          ))}
        <Button
          type="button"
          onClick={(e) => {
            if (reset) {
              setReset(false);
            }
            addAddon({ name: "", price: "0" });
          }}
          className="flex items-center justify-center gap-2 border border-primary hover:text-primary hover:bg-inherit"
        >
          <GoPlus className="w-4 h-4" />
          <span>add more {addonName}</span>
        </Button>
      </div>
    </div>
  );
};

export default MenuItemAddons;
