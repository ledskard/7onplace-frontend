import { ComponentProps } from "react";
import { UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FormError } from "./form-error";
import { register } from "module";

type FormTextAreaProps = ComponentProps<"textarea"> & {
  register: UseFormRegister<any>;
  id: string;
  error?: boolean;
  success?: boolean;
  helperText?: string;
};

export const FormTextArea = ({
  className,
  error,
  helperText,
  success,
  id,
  register,
  ...props
}: FormTextAreaProps) => {
  return (
    <div className="w-full flex flex-col gap-4 space-y-1 text-center">
      <textarea
        className={twMerge(
          "resize-none w-full shadow rounded md:rounded-md h-36 p-1 outline-none",
          className,
          error && "border-b-2 border-red-500"
        )}
        id={id}
        autoComplete="off"
        {...register(id)}
        {...props}
      />
      {helperText && <FormError>{helperText}</FormError>}
    </div>
  );
};
