import { ComponentProps, JSXElementConstructor, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"button">

export const SlideButton = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={twMerge("text-white bg-zinc-950 rounded-full", className)}
      {...props}
    />
  );
};
