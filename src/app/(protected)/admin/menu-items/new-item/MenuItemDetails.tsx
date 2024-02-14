"use client";

import LabelCheckbox from "@/components/share/LabelCheckbox";
import LabelInput from "@/components/share/LabelInput";
import LabelMoneyInput from "@/components/share/LabelMoneyInput";
import LabelSelect from "@/components/share/LabelSelect";
import LabelTextarea from "@/components/share/LabelTextarea";
import LoadingButton from "@/components/share/LoadingButton";
import { buttonVariants } from "@/components/ui/button";
import { cn, disableSubmitMenuItems } from "@/lib/utils";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import MenuItemAddons from "./MenuItemAddons";
import { createMenuItem } from "@/lib/actions/menuItemActions";
import { MenuItemType } from "@/product";

type Props = {
  categories: { id: string; name: string }[];
  originalMenuItem?: MenuItemType;
};

const init = {
  id: null,
  name: "",
  image: "",
  description: "",
  category: "",
  basePrice: "",
  sizes: [],
  extraIngredients: [],
  bestSeller: false,
};
const MenuItemDetails = ({ categories, originalMenuItem }: Props) => {
  const initState = originalMenuItem ?? init;

  const [menuItem, setMenuItem] = useState<MenuItemType | null>(initState);
  const [reset, setReset] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMenuItem((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  let disabledSubmit: boolean;
  if (originalMenuItem) {
    disabledSubmit = disableSubmitMenuItems(menuItem, originalMenuItem);
    console.log("disableSubmit case 1", disabledSubmit);
  } else {
    if (menuItem) {
      disabledSubmit =
        menuItem.name?.length === 0 ||
        menuItem.image?.length === 0 ||
        menuItem.description?.length === 0 ||
        menuItem.category?.length === 0 ||
        menuItem.basePrice?.length === 0;
      console.log("disableSubmit case 2", disabledSubmit);
      console.log("menuItem", menuItem);
    } else {
      disabledSubmit = true;
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e);

    const createMenuItemPromise = new Promise(async (resolve, reject) => {
      try {
        resolve(await createMenuItem(menuItem!));
      } catch (error) {
        reject(error);
      }
    });

    const result = await toast.promise(createMenuItemPromise, {
      pending: "Uploading...",
      success: "Uploading completed.",
      error: "Uploading failed.",
    });

    console.log("handleMenuItemImageChange result", result);
    setMenuItem(init);
    setReset(true);
  };

  const handleImageUpload = async (result: any) => {
    console.log("handleImageUpload result", result);
    setMenuItem((prev: any) => ({
      ...prev,
      image: result.info?.secure_url,
    }));
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border p-4 pt-8 mt-10 rounded-lg w-full">
      <div className="mx-auto p-4">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={
              menuItem?.image ? menuItem.image : "/images/default_picture.png"
            }
            width={180}
            height={180}
            alt="avatar"
            className="rounded-lg mb-2 bg-gray-300"
          />
          <CldUploadButton
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            className={cn(
              buttonVariants({ variant: "default" }),
              "flex items-center w-full "
            )}
            onUpload={handleImageUpload}
          >
            <FiUpload className="w-6 h-6 mr-2" />
            Upload
          </CldUploadButton>
        </div>
      </div>

      <div className="grow flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 pl-2">
            <LabelInput
              label="Name"
              id="name"
              name="name"
              type="text"
              value={menuItem?.name}
              handleChange={handleChange}
              placeholder="name of menu item"
            />

            <LabelTextarea
              label="Description"
              id="description"
              name="description"
              placeholder="tell something about the menu"
              value={menuItem?.description}
              handleChange={handleChange}
            />

            <LabelSelect
              label="Category"
              id="category"
              name="category"
              value={menuItem?.category}
              handleChange={(e) =>
                setMenuItem((prev: any) => {
                  console.log("e.target.value", e.target.value);
                  return {
                    ...prev,
                    category: e.target.value,
                  };
                })
              }
              opions={categories}
              className=""
            />
            <LabelMoneyInput
              label="Base Price"
              id="basePrice"
              name="basePrice"
              type="text"
              value={
                menuItem && menuItem.basePrice
                  ? menuItem.basePrice.toString()
                  : ""
              }
              handleChange={handleChange}
            />
            <div className="w-[400px]">
              <MenuItemAddons
                addonName="sizes"
                addonLabel="Add item size"
                setMenuItem={setMenuItem}
                menuItem={menuItem}
                reset={reset}
                setReset={setReset}
              />

              <MenuItemAddons
                addonName="extraIngredients"
                addonLabel="Add item extra ingredients"
                setMenuItem={setMenuItem}
                menuItem={menuItem}
                reset={reset}
                setReset={setReset}
              />
            </div>
            <LabelCheckbox
              label="Best Seller"
              id="bestSeller"
              name="bestSeller"
              type="checkbox"
              className="accent-primary"
              checked={menuItem?.bestSeller || false}
              handleChange={(e) =>
                setMenuItem((prev: any) => ({
                  ...prev,
                  bestSeller: e.target.checked,
                }))
              }
            />

            <div className="mt-4">
              <LoadingButton
                className="mb-4 capitalize border border-primary hover:text-primary hover:bg-inherit w-full"
                type="submit"
                disabled={disabledSubmit}
              >
                {menuItem?.id ? "update" : "create"}
              </LoadingButton>

              {/* <DeleteButton
          label="Delete this menu item"
          onDelete={handleDelete}
        /> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemDetails;
