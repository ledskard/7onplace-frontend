"use client";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

type CardModelsRootProps = ComponentProps<"div"> & {
  modelId: string;
};

export const CardModelDelete = ({
  className,
  modelId,
  ...props
}: CardModelsRootProps) => {
  const route = useRouter();
  const handleDeleteModel = async () => {
    try {
      const res = await fetch(`https://api.bioup.ai/models/${modelId}`, {
        method: "DELETE",
      });
      if (res) {
        toast({
          title: `✅ Modelo deletada`,
          duration: 3000,
        });
      }
      route.refresh();
    } catch (error) {
      toast({
        title: "❌ Não foi possível deletar a modelo",
        duration: 3000,
      });
    }
  };

  return (
    <div
      className={twMerge(
        "flex text-red-main bg-white shadow rounded-full w-8 h-8 justify-center items-center p-1 hover:bg-red-main hover:text-white duration-300 cursor-pointer",
        className
      )}
      onClick={handleDeleteModel}
      {...props}
    >
      <BsFillTrash3Fill />
    </div>
  );
};
