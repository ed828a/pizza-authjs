"use client";

import React from "react";
import { toast } from "react-toastify";
import {
  CldImage,
  CldUploadButton,
  CldUploadWidgetResults,
} from "next-cloudinary";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { FiUpload } from "react-icons/fi";
import { TMenuItem } from "@/product";

type Props = {
  menuItem: TMenuItem | null;
  setMenuItem: React.Dispatch<React.SetStateAction<TMenuItem | null>>;
};

const MenuItemImageUpload = ({ menuItem, setMenuItem }: Props) => {
  const handleMenuItemImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    // console.log(e);

    const files = e.target.files;
    if (files && files.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/cloudinary/upload", {
          method: "POST",
          body: data,
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        });

        if (response.ok) {
          const imageLink = await response.json();
          console.log("handleImageChange server returned result", imageLink);
          setMenuItem((prev: any) => ({ ...prev, image: imageLink.image }));
          resolve(imageLink.image);
        } else {
          reject({ message: "uploading image failed" });
        }
      });

      const result = await toast.promise(uploadPromise, {
        pending: "Uploading...",
        success: "Uploading completed.",
        error: "Uploading failed.",
      });

      console.log("handleMenuItemImageChange result", result);
    }
  };

  const handleImageUpload = async (result: CldUploadWidgetResults) => {
    console.log("result", result);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col justify-between ">
        <div className="flex flex-col items-center ">
          <CldImage
            src={
              menuItem?.image ? menuItem.image : "/images/default_picture.png"
            }
            width={180}
            height={180}
            alt="avatar"
            className="rounded-lg mb-2 dark:bg-gray-300 "
          />
          <CldUploadButton
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            className={cn(
              buttonVariants({ variant: "default" }),
              "flex items-center bg-sky-500"
            )}
          >
            <FiUpload className="w-6 h-6 mr-2" />
            Upload
          </CldUploadButton>
          <label className="w-full">
            <input
              id="image"
              name="image"
              type="file"
              className="hidden"
              onChange={handleMenuItemImageChange}
            />
            <span className="block border border-gray-300 hover:border-primary rounded-lg p-2 text-center text-gray-400 hover:text-primary cursor-pointer">
              Edit
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default MenuItemImageUpload;
