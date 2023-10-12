import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type AdvertRootProps = ComponentProps<"div">;

export const AdvertRoot = ({ className, ...props }: AdvertRootProps) => {
  return (
    <div
      className={twMerge(
        "sm:sticky sm:h-[85vh] bottom-4 sm:m-4 bg-red-main absolute mx-auto w-10/12 sm:max-w-[200px] text-center flex items-center justify-center text-white font-medium sm:p-0 py-2 rounded md:rounded-md",
        className
      )}
      {...props}
    />
  );
};
