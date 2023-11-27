import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ModelDetailsLocationProps = ComponentProps<"p">;

export const ModelDetailsLocation = ({
  className,
  ...props
}: ModelDetailsLocationProps) => {
  return (
    <p
      className={twMerge(
        "rounded-[30px] capitalize line-clamp-1 bg-gray-300 text-zinc-950 px-6 py-1",
        className
      )}
      {...props}
    />
  );
};
