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
        className
      )}
      fill
      objectFit='cover'
      objectPosition='center'
      blurDataURL={test}
      placeholder='blur'
      sizes="(max-width: 1280px) 50vw, 33vw"
      {...props}
    />
  );
};
