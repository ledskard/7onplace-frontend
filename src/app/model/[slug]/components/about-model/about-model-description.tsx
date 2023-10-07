import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type AboutModelDescriptionProps = ComponentProps<"p">

export const AboutModelDescription = ({className, ...props}: AboutModelDescriptionProps) => {
  return (
    <p className={twMerge("first-letter:capitalize text-justify text-lg", className)} {...props}/>
  )
}