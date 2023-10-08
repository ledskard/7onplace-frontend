"use client";
import { Button } from "@/components/ui/button";
import { Form } from "../../../components/interface/form-default/index";
import { FormLoginProps, UseLogin } from "@/hooks/use-login";

export const FormLoginContainer = () => {
  const {
    errors,
    isSubmitting,
    isSubmitSuccessful,
    register,
    reset,
    handleSubmit,
  } = UseLogin();

  const handleSubmitLogin = (data: FormLoginProps) => {
    console.log(data);
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
        disabled={isSubmitSuccessful}
      />
      <Form.Input
        type="password"
        register={register}
        id="password"
        placeholder="Senha"
        success={errors.password ? false : true}
        error={errors.password ? true : false}
        helperText={errors.password?.message}
        disabled={isSubmitSuccessful}
      />
      <Button
        type="submit"
        className="rounded-md max-w-[30%] md:max-w-[40%] mt-4"
      >
        {isSubmitting
          ? "Enviando..."
          : isSubmitSuccessful
          ? "Enviado"
          : "Enviar"}
      </Button>
    </Form.Root>
  );
};
