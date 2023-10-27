import React from "react";
import { Form, UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FormError } from "./form-error";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  register: UseFormRegister<any>;
  id: string;
  error?: boolean;
  success?: boolean;
  helperText?: string;
  wf?: boolean;
  invisible?: boolean;
};

export const FormInput = ({
  className,
  invisible = false,
  register,
  helperText,
  error,
  success,
  wf,
  id,
  ...props
}: InputProps) => {
  return (
    <div
      className={twMerge(
        "sm:w-6/12 w-full flex flex-col gap-4 space-y-1 text-center",
        wf && "sm:w-full",
        invisible && "invisible hidden"
      )}
    >
      <input
        className={twMerge(
          "outline-none border-b-2 px-2 py-1 md:p-3 drop-shadow-md disabled:bg-inherit border-slate-200 rounded md:rounded-lg placeholder:text-slate-400",
          className,
          error && "border-red-500",
          success && "border-slate-300"
        )}
        autoComplete="off"
        id={id}
        {...register(id)}
        {...props}
      />
      {helperText && <FormError>{helperText}</FormError>}
    </div>
  );
};
