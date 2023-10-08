import { admLoginSchema } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export type FormLoginProps = z.infer<typeof admLoginSchema>;

export const UseLogin = () => {
  const {
    formState: { errors, isSubmitting, isSubmitSuccessful },
    register,
    reset,
    handleSubmit,
  } = useForm<FormLoginProps>({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
    reValidateMode: "onChange",
    resolver: zodResolver(admLoginSchema),
  });
  return {
    errors,
    isSubmitting,
    isSubmitSuccessful,
    register,
    reset,
    handleSubmit,
  };
};
