import Image from "next/image";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";

type CardModelImageProps = ComponentProps<typeof Image>;

export const CardModelImage = ({
  className,
  ...props
}: CardModelImageProps) => {
  return (
    <Image
      loading="lazy"
      className={twMerge(
        `rounded-t-lg object-cover sm:max-h-[350px] sm:min-h-[350px] max-h-[150px] min-h-[150px] `,
        className
      )}
      width={800}
      height={800}
      {...props}
    />
  );
};
