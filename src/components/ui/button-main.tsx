import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"button">;

export const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "w-full h-10 uppercase text-white font-semibold bg-red-main rounded md:rounded-md",
        className,
      )}
      {...props}
    />
  );
};
