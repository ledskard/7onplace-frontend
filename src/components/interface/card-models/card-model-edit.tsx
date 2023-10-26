"use client";
import { toast } from "@/components/ui/use-toast";
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { EditModalContainer } from "../modal/edit-modal-container";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { ModelsFilterProps } from '@/types/model/models-filter-props';
import { delayLoadingAsyncRandom } from '@/utils/delay-loading-async-random';

type CardModelsRootProps = ComponentProps<"button"> & {
  model: ModelsFilterProps;
};

export const CardModelEdit = ({
  className,
  model,
  ...props
}: CardModelsRootProps) => {
  const [loading, setLoading] = useState(false);  

  const handleUpdateInfoModel = async () => {
    setLoading(true)

    // simular chamada fetch
    await delayLoadingAsyncRandom()

    setLoading(false)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
        <button
          className={twMerge(
            "flex text-red-main bg-white shadow rounded-full w-8 h-8 justify-center items-center p-2 hover:bg-red-main hover:text-white duration-300 cursor-pointer",
            className
          )}
          {...props}
        >
          <Pencil />
        </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Editar Modleo</DialogTitle>
          </DialogHeader>
            <form>
              <DialogFooter className='gap-3'>
                <DialogClose className='text-slate-950'>
                    Cancelar
                </DialogClose>
                <Button onClick={handleUpdateInfoModel} className='max-w-fit px-4 py-3 items-center flex justify-center' type="submit">
                  { loading ? 'Salvando...' : 'Salvar alterações'}
                </Button>
              </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
