import Image from "next/image";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { imgLoading } from "./card-models/card-model-base64-img-loading";

type PerfilImageProps = ComponentProps<typeof Image>;

export const PerfilImage = ({ className, ...props }: PerfilImageProps) => {
  return (
    <Image
      width={400}
      height={400}
      quality={100}
      // blurDataURL={imgLoading}
      className={twMerge(
        "rounded-full w-[40px] h-[40px] aspect-square shadow-md shadow-gray-500 object-cover object-center",
        className
      )}
      {...props}
    />
  );
};
