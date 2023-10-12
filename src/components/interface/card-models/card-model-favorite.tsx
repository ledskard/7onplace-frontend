'use client'

import { ComponentProps, MouseEvent, useState } from "react";
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
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(favorites);


  const handleLike = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();

    setIsLiked(!isLiked);

    if (isLiked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
  }

  return (
     <button
      className={twMerge(
        "flex gap-2 text-lg md:text-2xl font-bold items-center md:mt-2 justify-center text-red-main z-30",
        className
      )}
      onClick={handleLike}
      {...props}
    >
        <AiFillHeart className="md:text-2xl lg:text-3xl" color={ isLiked ? "#9A1F33" : "#000"} />
      {normalizeFavorites(count)}
    </button>
  );
};
