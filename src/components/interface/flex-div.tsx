import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type FlexDivProps = ComponentProps<"div"> & {
  col?: boolean
}

export const FlexDiv = ({className, col = false, ...props}: FlexDivProps) => {
    return (
      <div data-isCol={col} className={twMerge("flex gap-4 data-[isCol=false]:items-center data-[isCol=true]:flex-col", className)} {...props}/>
    )
  }