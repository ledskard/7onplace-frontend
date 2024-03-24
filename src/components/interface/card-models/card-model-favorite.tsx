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


  const handleLike = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();

    setIsLiked(!isLiked);
    setCount(isLiked ? count - 1 : count + 1);

    const likedModels: any = JSON.parse(localStorage.getItem("likedModels") || "[]");
    const isCurrentlyLiked = likedModels.includes(modelName);

    if (isCurrentlyLiked) {
      // @ts-ignore
      const newLikedModels = likedModels.filter(model => model !== modelName);
      localStorage.setItem("likedModels", JSON.stringify(newLikedModels));
    } else {
      // Se não estava curtido, adiciona o modelo aos curtidos.
      localStorage.setItem("likedModels", JSON.stringify([...likedModels, modelName]));
      // Só chama incrementLike se o modelo realmente não estava curtido antes.
      await incrementLike(modelName);
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
