"use client";
import { updateModelButtons } from "@/utils/update-model-buttons";
import { Trash } from "lucide-react";
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

const removeButton = async (
  buttonId: string,
  modelButtons: ModelButtonsProps[],
  modelSlug: string
) => {
  const buttonsWithoutDeletedButton = modelButtons.filter(
    (but) => but.id !== buttonId
  );

  console.log("3",modelButtons);
  console.log("2",buttonsWithoutDeletedButton);

  const aaa = await updateModelButtons({
    buttons: buttonsWithoutDeletedButton,
    slug: modelSlug,
  });

  console.log("4", aaa);
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
      <Trash
        className="absolute z-50 top-1 right-1 text-white w-7 h-7 rounded-md p-1"
        onClick={() => removeButton(buttonId, modelButtons, modelSlug)}
      />
    </button>
  );
};
