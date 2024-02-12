"use client";

import React, { useState } from "react";
import BasicModal from "./BasicModal";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import LoadingButton from "./LoadingButton";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  deleteAction: () => void;
};

const DeleteDialog = ({ isOpen, closeModal, deleteAction }: Props) => {
  return (
    <BasicModal open={isOpen} onClose={closeModal}>
      <div className="text-center w-72 px-4">
        <div className="pt-8 pb-2 flex justify-center items-center">
          <FaRegTrashAlt
            width={120}
            hanging={120}
            className="w-48 h-48  text-red-500"
          />
        </div>

        <div className="mx-auto my-4 w-44 ">
          <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this item?
          </p>
        </div>
        <div className="flex justify-around gap-8  w-full">
          <Button
            onClick={deleteAction}
            className="dark:bg-primary dark:border-primary-foreground dark:text-primary-foreground border border-transparent hover:border-primary hover:text-primary dark:hover:bg-primary-foreground dark:hover:text-primary rounded-md px-4"
          >
            Delete
          </Button>
          <Button
            className="border border-transparent rounded-md hover:border-primary hover:text-primary dark:bg-primary dark:border-primary-foreground dark:text-primary-foreground dark:hover:bg-primary-foreground dark:hover:text-primary "
            onClick={closeModal}
          >
            Cancel
          </Button>
        </div>
      </div>
    </BasicModal>
  );
};

export default DeleteDialog;
