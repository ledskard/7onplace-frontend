"use client";
import { toast } from "@/components/ui/use-toast";
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { EditModalContainer } from "../modal/edit-modal-container";

type CardModelsRootProps = ComponentProps<"div"> & {
  modelId: string;
};

export const CardModelEdit = ({
  className,
  modelId,
  ...props
}: CardModelsRootProps) => {
  const route = useRouter();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  // console.log(isOpenModal);

  const handleModalClick = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <div
        className={twMerge(
          "flex text-red-main bg-white shadow rounded-full w-8 h-8 justify-center items-center p-2 hover:bg-red-main hover:text-white duration-300 cursor-pointer",
          className
        )}
        onClick={handleModalClick}
        {...props}
      >
        <Pencil />
      </div>
      <EditModalContainer
        isOpenModal={isOpenModal}
        modelId={modelId}
        handleModal={handleModalClick}
      />
    </>
  );
};
