"use client";
import { Button } from "@/components/ui/button";
import { Form } from "../../../components/interface/form-default/index";
import { FormLoginProps, UseLogin } from "@/hooks/use-login";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const FormLoginContainer = () => {
  const route = useRouter();
  const {
    errors,
    isSubmitting,
    isSubmitSuccessful,
    register,
    reset,
    handleSubmit,
  } = UseLogin();

  const handleSubmitLogin = async (data: FormLoginProps) => {
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!res?.error) {
        route.push("/admregister");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form.Root onSubmit={handleSubmit(handleSubmitLogin)}>
      <Form.Logo />
      <Form.Input
        type="text"
        register={register}
        id="username"
        placeholder="Nome de usuário"
        success={errors.username ? false : true}
        error={errors.username ? true : false}
        helperText={errors.username?.message}
      />
      <Form.Input
        type="password"
        register={register}
        id="password"
        placeholder="Senha"
        success={errors.password ? false : true}
        error={errors.password ? true : false}
        helperText={errors.password?.message}
      />
      <Button
        type="submit"
        className="rounded-md max-w-[30%] md:max-w-[40%] mt-4"
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </Button>
    </Form.Root>
  );
};
