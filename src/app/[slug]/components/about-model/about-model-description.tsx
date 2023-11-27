import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type AboutModelDescriptionProps = ComponentProps<"p">;

export const AboutModelDescription = ({
  className,
  ...props
}: AboutModelDescriptionProps) => {
  return (
    <p
      className={twMerge(
        "first-letter:capitalize text-justify text-base md:text-lg md:line-clamp-5 line-clamp-3",
        className
      )}
      {...props}
    />
  );
};
