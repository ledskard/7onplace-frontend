import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type GridCol = ComponentProps<"section"> & {
  col: string;
};

export const GridCol = ({ className, col, ...props }: GridCol) => {
  return (
    <section
      className={twMerge(
        `grid grid-cols-${col} gap-4 mx-auto items-center mb-6 mt-4 w-11/12`,
        className
      )}
      {...props}
    />
  );
};
