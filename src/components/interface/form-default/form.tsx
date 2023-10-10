import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type FormRootProps = ComponentProps<"form">;

export const FormRoot = ({ className, ...props }: FormRootProps) => {
  return (
    <form
      className={twMerge(
        "flex flex-col gap-6 md:gap-8 sm:max-w-xl justify-center items-center min-h-[92vh] w-10/12 max-w-5xl m-auto",
        className
      )}
      {...props}
    />
  );
};
