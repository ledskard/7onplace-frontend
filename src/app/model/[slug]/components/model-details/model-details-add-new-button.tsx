import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { FormModalRoot } from "../form-modal-root";
import { ModelsFilterProps } from "@/types/model/models-filter-props";

export const ModelDetailsAddNewButtonModal = ({
  model,
}: {
  model: ModelsFilterProps;
}) => {
  console.log(model);
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
