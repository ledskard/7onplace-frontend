import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type CardModelsRootProps = ComponentProps<"div">;

export const CardModelRoot = ({ className, ...props }: CardModelsRootProps) => {
  return (
    <div
      className={twMerge(
        "rounded-lg w-full shadow-lg sm:max-h-[500px] sm:min-h-[500px] relative max-h-[250px] bg-red-main flex flex-col overflow-hidden",
        className
      )}
      {...props}
    />
  );
};
