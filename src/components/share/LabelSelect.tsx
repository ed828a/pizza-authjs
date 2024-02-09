import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  label: string;
  id: string;
  name: string;
  value?: string | undefined;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  opions: { id: string; name: string }[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string | undefined;
};

const LabelSelect = ({
  label,
  id,
  name,
  value,
  handleChange,
  opions,
  className,
  placeholder,
  disabled,
  defaultValue,
}: Props) => {
  // const choosed = opions.find((o) => o.id === value);

  // console.log("choosed", choosed);
  // console.log("value", value);

  // const firstLabel =
  //   opions.find((o) => o.id === id)?.name || "choose a category";

  return (
    <div className="relative flex items-center pt-1 ">
      <label
        htmlFor="category"
        className="text-gray-400 border border-white rounded-lg px-8 py-2"
      >
        {label}

        <select
          name={name}
          id={id}
          value={value}
          onChange={handleChange}
          required
          className={cn("ml-2 text-white", className)}
        >
          {/* <option value="">choose a category</option> */}
          {opions.length > 0 &&
            opions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
      </label>
    </div>
  );
};

export default LabelSelect;
