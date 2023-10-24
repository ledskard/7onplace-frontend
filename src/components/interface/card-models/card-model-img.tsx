import Image from "next/image";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { test } from "./testa";

type CardModelImageProps = ComponentProps<typeof Image>;

export const CardModelImage = ({
  className,
  ...props
}: CardModelImageProps) => {
  return (
    <Image
      className={twMerge(
        `w-full rounded-t-lg object-contain sm:max-h-[350px] sm:min-h-[350px] max-h-[150px] min-h-[150px] object-cover object-center`,
        className
      )}
      width={350}
      height={350}
      sizes="(max-width: 1280px) 50vw, 33vw"
      {...props}
    />
  );
};
