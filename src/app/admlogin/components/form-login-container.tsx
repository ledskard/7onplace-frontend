"use client";
import { Button } from "@/components/ui/button-main";
import { Form } from "../../../components/interface/form-default/index";
import { FormLoginProps, UseLogin } from "@/hooks/use-login";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export const FormLoginContainer = () => {
  const route = useRouter();
  const { errors, isSubmitting, register, handleSubmit } = UseLogin();

  const handleSubmitLogin = async (data: FormLoginProps) => {
    try {
      
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (!res?.error) {
        toast({
          title: `✅ Login sucedido`,
          duration: 3000,
        });
        return route.push("/admregister");
      }
      toast({
        title: `Erro ao tentar fazer login`,
      });
    } catch (error) {
      toast({
        title: `Erro na API: ${error}`,
      });
    }
  };

  return (
    <section className="flex flex-col h-[calc(100vh)] items-center justify-center">
      <Form.Root
        onSubmit={handleSubmit(handleSubmitLogin)}
        className="m-auto my-0"
      >
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
          className="rounded-md max-w-[40%] md:max-w-[40%] mt-4"
        >
          {isSubmitting ? "Logando..." : "Fazer Login"}
        </Button>
      </Form.Root>
    </section>
  );
};
