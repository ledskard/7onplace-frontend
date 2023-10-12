import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type GridCol = ComponentProps<"section"> & {
  col?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | '10';
};

export const GridCol = ({ className, col, ...props }: GridCol) => {
  return (
    <section
      className={twMerge(
        `grid gap-4 mx-auto items-center mb-6 mt-4 w-11/12`,
        col === "1" && "grid-cols-1",
        col === "2" && "grid-cols-2",
        col === "3" && "grid-cols-3",
        col === "4" && "grid-cols-4",
        col === "5" && "grid-cols-5",
        col === "6" && "grid-cols-6",
        col === "7" && "grid-cols-7",
        col === "8" && "grid-cols-8",
        col === "9" && "grid-cols-9",
        col === "10" && "grid-cols-10",
        className
      )}
      {...props}
    />
  );
};
