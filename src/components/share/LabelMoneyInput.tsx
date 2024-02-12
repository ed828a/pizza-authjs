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
};

const LabelMoneyInput = ({
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
}: Props) => {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="text-gray-400 w-full rounded-lg border border-gray-300 py-2 px-4 flex justify-between"
      >
        <span>{label}</span>

        <div className="pointer-events-none bottom-[9px]  flex items-center ">
          <span className="text-gray-500 mr-1">$</span>

          <input
            type={type}
            id={id}
            className={cn(
              "appearance-none w-12 dark:text-white dark:bg-inherit",
              className
            )}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
            disabled={disabled}
            defaultValue={defaultValue}
          />
        </div>
      </label>
    </div>
  );
};

export default LabelMoneyInput;
