import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ModelsProps } from "@/types/model/models-filter-props";
import { Plus } from "lucide-react";

import { FormModalRoot } from "../form-modal-root";

type ModelDetailsAddNewButtonModalProps = {
  model: ModelsProps;
};

export const ModelDetailsAddNewButtonModal = ({
  model,
}: ModelDetailsAddNewButtonModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="self-end">
        <button className="rounded-full w-fit border bg-red-main text-white p-1">
          <Plus />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar novo botão de link para a modelo</DialogTitle>
          <DialogDescription>
            Informe o nome do botão e o link a ser adicionado
          </DialogDescription>
        </DialogHeader>
        <FormModalRoot model={model} />
      </DialogContent>
    </Dialog>
  );
};
