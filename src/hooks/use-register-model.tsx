import { registerSchema } from "@/schemas/register-model-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export type FormRegisterProps = z.infer<typeof registerSchema>;

export const UseRegisterModel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
  } = useForm<FormRegisterProps>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(registerSchema),
  });
  return {
    register,
    handleSubmit,
    errors,
    isSubmitSuccessful,
    isSubmitting,
    reset,
  };
};
