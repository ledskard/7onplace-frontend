import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type FormErrorProps = ComponentProps<"p"> & {
  error?: string;
};

export const FormError = ({ className, error, ...props }: FormErrorProps) => {
  return (
    <p
      className={twMerge(
        "text-center block mt-2 text-xs opacity-70 font-bold text-red-500",
        className
      )}
      {...props}
    />
  );
};
