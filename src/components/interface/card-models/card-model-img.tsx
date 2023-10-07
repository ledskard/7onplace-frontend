
import Image from "next/image"
import { ComponentProps, useState } from "react"
import { twMerge } from "tailwind-merge"

type CardModelImageProps = ComponentProps<typeof Image>

export const CardModelImage = ({className, ...props}: CardModelImageProps) => {

  return (
    <Image className={twMerge(`w-full h-full rounded-t-lg`, className)} width={800} height={800} {...props}/>
  )
}