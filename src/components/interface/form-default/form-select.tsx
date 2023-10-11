"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type FormSelectProps = ComponentProps<"select"> & {
  option: string[];
};

export const FormSelect = ({
  className,
  option,
  ...props
}: FormSelectProps) => {
  return (
    <select className={twMerge("", className)} {...props}>
      {option.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};
