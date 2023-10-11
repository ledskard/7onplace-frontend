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
      className={twMerge(
        `w-full rounded-t-lg md:h-64 h-28 object-cover object-center`,
        className
      )}
      width={800}
      height={800}
      {...props}
    />
  );
};
