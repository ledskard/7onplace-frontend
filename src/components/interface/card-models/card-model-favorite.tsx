import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { AiFillHeart } from "react-icons/ai";
import { normalizeFavorites } from "@/utils/normalize-favorites";

type CardModelFavoriteProps = ComponentProps<"button"> & {
  favorites: number;
};

export const CardModelFavorite = ({
  favorites,
  className,
  ...props
}: CardModelFavoriteProps) => {
  return (
    <span
      className={twMerge(
        "flex gap-2 text-lg md:text-2xl font-bold items-center md:mt-2 justify-center text-red-main",
        className
      )}
      {...props}
    >
      <span>
        <AiFillHeart className="md:text-2xl lg:text-3xl" color={"#9A1F33"} />
      </span>
      {normalizeFavorites(favorites)}
    </span>
  );
};
