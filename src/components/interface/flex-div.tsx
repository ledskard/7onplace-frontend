import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type FlexDivProps = ComponentProps<"div"> & {
  col?: boolean
}

export const FlexDiv = ({className, col = false, ...props}: FlexDivProps) => {
    return (
      <div  className={twMerge(
        "flex gap-4",
        col ? "flex-col" : "items-center",
        className)} {...props}/>
    )
  }