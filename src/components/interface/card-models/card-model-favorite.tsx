"use client";

import { ComponentProps, MouseEvent, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { AiFillHeart } from "react-icons/ai";
import { normalizeFavorites } from "@/utils/normalize-favorites";
import { incrementLike } from "@/utils/increment-like-to-model";

type CardModelFavoriteProps = ComponentProps<"button"> & {
  favorites: number;
  modelName: string;
};

export const CardModelFavorite = ({
  favorites,
  className,
  modelName,
  ...props
}: CardModelFavoriteProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(favorites);
  useEffect(() => {
    const likedModels = JSON.parse(localStorage.getItem("likedModels") || "[]");
    if (likedModels.includes(modelName)) {
      setIsLiked(true);
    }
  }, [modelName]);


  const handleLike = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();

    const likedModels = JSON.parse(localStorage.getItem("likedModels") || "[]");
    if (isLiked) {
      setCount(count - 1);
<<<<<<< HEAD
      setIsLiked(!isLiked);
    } else {
      setCount(count + 1);
      setIsLiked(isLiked);
=======
    } else  {
      setCount(count + 1);
      setIsLiked(!isLiked);
>>>>>>> 88aa1b6935b8673c48fe8e248e63972291b14290
      localStorage.setItem("likedModels", JSON.stringify([...likedModels, modelName]));
      if (!likedModels.includes(modelName)) {
        await incrementLike(modelName);
      }
    }

  };

  return (
    <button
      className={twMerge(
        "flex gap-2 text-lg md:text-xl font-bold items-center md:mt-2 justify-center text-red-main z-30",
        className
      )}
      onClick={handleLike}
      {...props}
    >
      <AiFillHeart className="" color={isLiked ? "#9A1F33" : "#000"} />
      {count}
    </button>
  );
};
