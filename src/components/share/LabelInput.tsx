import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  label: string;
  id: string;
  name: string;
  type: string;
  value?: string | undefined;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string | undefined;
  readOnly?: boolean;
};

const LabelInput = ({
  label,
  id,
  name,
  type,
  value,
  handleChange,
  className,
  placeholder,
  disabled,
  defaultValue,
  readOnly,
}: Props) => {
  return (
    <div className=" relative ">
      <label htmlFor={id} className="text-gray-400">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={cn(
          "rounded-lg border-transparent flex-1 border border-gray-300 hover:border-primary w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-foreground hover:disabled:border-gray-300 focus:border-transparent dark:bg-inherit dark:text-white appearance-none",
          className
        )}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        disabled={disabled}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
    </div>
  );
};

export default LabelInput;
