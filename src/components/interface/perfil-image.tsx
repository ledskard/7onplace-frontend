import Image from "next/image";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type PerfilImageProps = ComponentProps<typeof Image>;

export const PerfilImage = ({ className, ...props }: PerfilImageProps) => {
  return (
    <Image
      width={400}
      height={400}
      quality={100}
      placeholder="blur"
      className={twMerge(
        "rounded-full w-[40px] h-[40px] aspect-square shadow-md shadow-gray-500 object-cover object-center",
        className
      )}
      {...props}
    />
  );
};
