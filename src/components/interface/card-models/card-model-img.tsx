'use client'
import Image from "next/image"
import { ComponentProps, useState } from "react"
import { twMerge } from "tailwind-merge"

type CardModelImageProps = ComponentProps<typeof Image>

export const CardModelImage = ({className, ...props}: CardModelImageProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <Image {...props} className={twMerge(`w-full h-full ${isLoading ? "scale-105 blur-sm" : "blur-none scale-100"}`, className)} width={300} height={300} onLoadingComplete={()=> setIsLoading(false)} />
  )
}