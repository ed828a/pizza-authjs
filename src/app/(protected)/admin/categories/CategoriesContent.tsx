"use client";

import React, { useEffect, useState } from "react";
import CreateEditCategory from "./CreateEditCategory";
import { CategoryType } from "@/next-auth";
import { deleteOneCategory } from "@/lib/actions/categoryActions";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/share/DeleteDialog";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  categories: CategoryType[];
};

const CategoriesContent = ({ categories }: Props) => {
  const [focusedCategory, setFocusedCategory] = useState({});

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [categoriesState, setCategoriesState] = useState<CategoryType[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCategoriesState(categories);
  }, [categories]);

  const openModal = () => {
    setIsOpenDialog(true);
  };

  const closeModal = () => {
    setIsOpenDialog(false);
  };

  const deleteAction = async () => {
    console.log("deleteId", deleteId);
    let result;
    if (deleteId) {
      result = await deleteOneCategory(deleteId);
    }
    closeModal();
    setDeleteId(null);
    if (result?.message) {
      toast.success(result.message);
      router.refresh();
    } else if (result?.error) {
      toast.error(result.error);
    }
  };

  return (
    <div>
      <CreateEditCategory
        focusedCategory={focusedCategory}
        setFocusedCategory={setFocusedCategory}
        setCategoriesState={setCategoriesState}
      />

      <div className="mt-16">
        <h5 className="text-gray-500 capitalize">Available categories</h5>
        <div className="flex flex-col gap-4">
          {categoriesState.length > 0 &&
            categoriesState.map((category) => (
              <div
                key={category.id}
                className="flex justify-between items-center bg-gray-300 px-4 py-2 rounded-lg dark:bg-inherit dark:border  "
              >
                <h3>{category.name}</h3>
                <div className="flex gap-4">
                  <Button
                    onClick={() =>
                      setFocusedCategory({
                        id: category.id,
                        name: category.name,
                      })
                    }
                    type="button"
                    className="bg-gray-300 border text-gray-700 hover:border-primary hover:text-primary hover:bg-inherit hover:dark:bg-inherit"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      setDeleteId(category.id);
                      openModal();
                    }}
                    variant={"ghost"}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <DeleteDialog
        isOpen={isOpenDialog}
        closeModal={closeModal}
        deleteAction={deleteAction}
      />
    </div>
  );
};

export default CategoriesContent;
