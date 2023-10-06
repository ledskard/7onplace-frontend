import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import {AiFillHeart} from 'react-icons/ai'


type CardModelFavoriteProps = ComponentProps<"button"> & {
  favorites: number
}

export const CardModelFavorite = ({ favorites, className, ...props}: CardModelFavoriteProps) => {
  return (
    <span className={twMerge("", className)} {...props}>
      <AiFillHeart />{" "}{favorites}
    </span>
  )
}