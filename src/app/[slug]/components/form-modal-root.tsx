"use client";
import { signOut, useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/components/interface/form-default";
import { Button } from "@/components/ui/button-main";

import revalidateTagAPI from "@/actions/revalidateTag";
import { ModelsProps } from "@/types/model/models-filter-props";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type ModelButtonsProps = Array<{
  title: string;
  url: string;
}>;

const EditModelButtonsSchema = z.object({
  title: z.string().min(1, "Campo não pode estar vazio!"),
  url: z.string().min(1, "Campo não pode estar vazio"),
});

export type EditModelButtonSchemaProps = z.infer<typeof EditModelButtonsSchema>;

export const FormModalRoot = ({ model }: { model: ModelsProps }) => {
  const [buttons, setButtons] = useState<ModelButtonsProps>(model.buttons);
  const { data: session } = useSession();
  const { slug } = useParams();

  const {
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm<EditModelButtonSchemaProps>({
    mode: "onChange",
    resolver: zodResolver(EditModelButtonsSchema),
    reValidateMode: "onChange",
  });

  const handleAddButton = async (data: EditModelButtonSchemaProps) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/models/${slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session?.user.token,
          },
          body: JSON.stringify({ ...model, buttons: [...buttons, data] }),
        },
      );
      const result = await res.json();

      if (result.status === 401) {
        signOut();
      }
      revalidateTagAPI("modelById");
      reset();
      setButtons((prev) => prev.concat(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form.Root
      onSubmit={handleSubmit(handleAddButton)}
      className="my-6 mx-auto p-0"
    >
      <Form.Input
        register={register}
        id={"title"}
        helperText={errors.title?.message?.toString()}
        error={!!errors.title?.message}
        success={!!errors.title?.message}
        placeholder="Nome do novo botão"
        wf
        className="mx-auto border-red-main border w-full"
      />
      <Form.Input
        register={register}
        id={"url"}
        helperText={errors.url?.message?.toString()}
        error={!!errors.url?.message}
        success={!!errors.url?.message}
        placeholder="Link do novo botão"
        wf
        className="mx-auto border-red-main border w-full"
      />
      <Button className="max-w-fit px-2 self-end mt-0" disabled={isSubmitting}>
        {isSubmitting ? "Adicionando..." : "Adicionar"}
      </Button>
    </Form.Root>
  );
};
