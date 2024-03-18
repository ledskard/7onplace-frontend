import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

type CardModelContentDivProps = ComponentProps<"div">;
export const CardModelContentDiv = ({
  className,
  ...props
}: CardModelContentDivProps) => {
  return (
    <div
      className={twMerge(
        "relative h-auto text-center flex flex-col justify-center items-center md:pt-10 md:pb-3 pt-4 pb-2 sm:pt-10 mt-auto",
        className,
      )}
      {...props}
    />
  );
};
