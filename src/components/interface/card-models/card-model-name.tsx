import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type CardModelName = ComponentProps<"h2">

export const CardModelName = ({className, ...props}: CardModelName) => {
  return (
    <h2 className={twMerge("font-semibold capitalize text-xl md:text-2xl line-clamp-1", className)} {...props}/>
  )
}