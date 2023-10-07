import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type AboutModelHeadingProps = ComponentProps<"p">

export const AboutModelHeading = ({className, ...props}: AboutModelHeadingProps) => {
  return (
    <h4 className={twMerge("font-medium capitalize text-xl md:text-3xl", className)} {...props}/>
  )
}