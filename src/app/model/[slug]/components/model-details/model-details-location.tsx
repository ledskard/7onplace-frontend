import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type ModelDetailsLocationProps = ComponentProps<"p">

export const ModelDetailsLocation = ({className, ...props}: ModelDetailsLocationProps) => {
  return (
    <p className={twMerge("rounded-[30px] capitalize bg-gray-300 text-zinc-950 px-6 py-2", className)} {...props}/>
  )
}