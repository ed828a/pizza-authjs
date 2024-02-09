import React from "react";

type Props = {
  label: string;
  id: string;
  name: string;
  type: string;
  value?: string | undefined;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  checked?: boolean;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string | undefined;
};

const LabelCheckbox = ({
  label,
  id,
  name,
  type,
  value,
  handleChange,
  className,
  checked,
}: Props) => {
  return (
    <div className="relative">
      <label htmlFor="bestSeller" className="flex gap-2">
        <input
          type={type}
          name={name}
          id={id}
          className={className}
          checked={checked}
          onChange={handleChange}
        />
        <span className="text-sm">{label}</span>
      </label>
    </div>
  );
};

export default LabelCheckbox;
