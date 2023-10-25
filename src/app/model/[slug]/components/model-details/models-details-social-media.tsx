import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ModelSocialMediaProps = ComponentProps<typeof Link>;

export const ModelDetailsSocialMedia = ({
  className,
  ...props
}: ModelSocialMediaProps) => {
  return (
    <div>
      <Link
        {...props}
        className={twMerge("text-red-main w-7 h-7", className)}
      />
    </div>
  );
};
