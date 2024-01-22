"use client";
import { toast } from "@/components/ui/use-toast";
import { updateModelButtons } from "@/utils/update-model-buttons";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export type ModelButtonsProps = {
  id: string;
  url: string;
  title: string;
};

type ButtonProps = ComponentProps<"button"> & {
  modelButtons: Array<ModelButtonsProps>;
  buttonId: string;
  title: string;
  url: string;
  modelSlug: string;
};

type RemoveButtonProps = {
  buttonId: string,
  modelButtons: ModelButtonsProps[],
  modelSlug: string,
  token: string
}

const removeButton = async (
  {buttonId, modelButtons, modelSlug, token}: RemoveButtonProps
) => {
  const buttonsWithoutDeletedButton = modelButtons.filter(
    (but) => but.id !== buttonId
  );

  const modeloUpdated = await updateModelButtons({
    buttons: buttonsWithoutDeletedButton,
    slug: modelSlug,
    token
  });

  if (!modeloUpdated) {
    toast({
      title: `Não foi possível deletar um botão da modelo`,
      duration: 3000,
    });
  }

  toast({
    title: `✅ Botão removido da modelo`,
    duration: 3000,
  });
};

export const ButtonSocialMedia = ({
  className,
  buttonId,
  modelButtons,
  title,
  modelSlug,
  url,
  ...props
}: ButtonProps) => {
  const { data: session } = useSession();

  return (
    <button
      className={twMerge(
        "w-full h-10 uppercase text-white font-semibold bg-red-main rounded md:rounded-md relative",
        className
      )}
      {...props}
    >
      <a key={title} href={url} target="_blank">
        {title}
      </a>
      {session?.user.token && (
        <Trash
          className="absolute z-50 top-1 right-1 text-white w-7 h-7 rounded-md p-1"
          onClick={() => removeButton({
            buttonId,
            modelButtons,
            modelSlug,
            token: session.user.token
          })}
        />
      )}
    </button>
  );
};
