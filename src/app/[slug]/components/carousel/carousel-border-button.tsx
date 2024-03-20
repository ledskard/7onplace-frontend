import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

type BorderButtonProps = ComponentProps<"div">;

export const BorderButton = ({ className, ...props }: BorderButtonProps) => {
  return (
    <div
      className={twMerge(
        "rounded-full bg-zinc-900/50 md:text-4xl text-3xl p-1 flex items-center justify-center",
        className,
      )}
      {...props}
    />
  );
};
