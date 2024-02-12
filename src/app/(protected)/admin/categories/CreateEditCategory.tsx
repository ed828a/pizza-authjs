"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Id, toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createOrUpdateCategory } from "@/lib/actions/categoryActions";
import LoadingButton from "@/components/share/LoadingButton";
import { useRouter } from "next/navigation";
import { CategoryType } from "@/next-auth";

type Props = {
  focusedCategory: {
    id?: string;
    name?: string;
  };
  setFocusedCategory: React.Dispatch<React.SetStateAction<{}>>;
  setCategoriesState: React.Dispatch<React.SetStateAction<CategoryType[]>>;
};

const CreateEditCategory = ({
  focusedCategory,
  setFocusedCategory,
  setCategoriesState,
}: Props) => {
  console.log("focusedCategory", focusedCategory);

  // const [category, setCategory] = useState(focusedCategory);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const toastId = React.useRef(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFocusedCategory((prev) => ({ ...prev, [name]: value }));
  };

  const isNew = !focusedCategory.id;

  // console.log("CreateEditCategory isNew = ", isNew);
  // console.log("CreateEditCategory categoryState", category);
  console.log("CreateEditCategory focusedCategory", focusedCategory);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUploading(true);
    const toastId = toast.info("uploading...");
    // console.log("category", category);
    console.log("category", focusedCategory);
    try {
      // const result = await createOrUpdateCategory(category);
      const result = await createOrUpdateCategory(focusedCategory);
      console.log("handleSubmit result", result);
      setUploading(false);
      setFocusedCategory({});

      toast.dismiss(toastId);

      if (result.message) {
        toast.success(result.message);
      } else if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="min-w-[320px] sm:min-w-[512px]">
        <label htmlFor="name" className="text-sm text-gray-500 capitalize">
          {`${isNew ? "New " : " "}category name`}
        </label>
        <div className="flex flex-col sm:flex-row gap-4 ">
          <Input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            value={focusedCategory.name || ""}
            className="dark:bg-gray-700"
          />
          <div className="flex gap-4 ">
            <LoadingButton
              type="submit"
              isLoading={uploading}
              className="capitalize bg-background hover:border-primary text-primary hover:text-primary"
            >
              {isNew ? "create" : "update"}
            </LoadingButton>
            <Button
              type="button"
              onClick={() => setFocusedCategory({})}
              variant={"outline"}
              className="capitalize"
            >
              cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEditCategory;
