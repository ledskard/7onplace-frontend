import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type FormErrorProps = ComponentProps<"p"> & {
  error?: string;
};

export const FormError = ({ className, error, ...props }: FormErrorProps) => {
  return (
    <p
      className={twMerge("text-red-main font-semibold text-sm", className)}
      {...props}
    >
      {error}
    </p>
  );
};
