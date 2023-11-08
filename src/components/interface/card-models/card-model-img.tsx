import Image from "next/image";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { imgLoading } from "./card-model-base64-img-loading";

type CardModelImageProps = ComponentProps<typeof Image>;

export const CardModelImage = ({
  className,
  ...props
}: CardModelImageProps) => {
  return (
    <Image
      className={twMerge("object-fill object-center", className)}
      fill
      loading={"lazy"}
      blurDataURL={imgLoading}
      placeholder="blur"
      sizes="(max-width: 1280px) 50vw, 33vw"
      {...props}
    />
  );
};
