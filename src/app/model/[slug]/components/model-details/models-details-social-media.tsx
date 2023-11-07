import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ModelSocialMediaProps = ComponentProps<"a">;

export const ModelDetailsSocialMedia = ({
  className,
  ...props
}: ModelSocialMediaProps) => {
  return (
    <div>
      <a
        {...props}
        className={twMerge(
          "text-red-main/80 w-7 h-7 cursor-pointer",
          className
        )}
      />
    </div>
  );
};
