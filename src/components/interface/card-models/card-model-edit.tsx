"use client";
import { toast } from "@/components/ui/use-toast";
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

type CardModelsRootProps = ComponentProps<"div"> & {
  modelId: string;
};

export const CardModelEdit = ({
  className,
  modelId,
  ...props
}: CardModelsRootProps) => {
  const route = useRouter();

  return (
    <div
      className={twMerge(
        "flex text-red-main bg-white shadow rounded-full w-8 h-8 justify-center items-center p-2 hover:bg-red-main hover:text-white duration-300 cursor-pointer",
        className
      )}
      // onClick={handleDeleteModel}
      {...props}
    >
      <Pencil />
    </div>
  );
};
