import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type AdvertRootProps = ComponentProps<"div">;

export const AdvertRoot = ({ className, ...props }: AdvertRootProps) => {
  return (
    <div
      className={twMerge(
        "tablet:sticky tablet:h-[85vh] bottom-4 bg-gray-400  absolute mx-auto w-10/12 tablet:max-w-[180px] text-center flex items-center justify-center text-black font-medium tablet:p-0 py-2 rounded md:rounded-md min-h-[10vh] cursor-pointer",
        className
      )}
      {...props}
    />
  );
};
