import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type CardModelsRootProps = ComponentProps<"div">

export const CardModelRoot = ({className, ...props}: CardModelsRootProps) => {
  return (
    <div className={twMerge("", className)} {...props} />
  )
}