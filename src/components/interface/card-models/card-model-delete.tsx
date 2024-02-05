"use client";
import { toast } from "@/components/ui/use-toast";
import { signOut, useSession } from "next-auth/react";
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
  const { data: session } = useSession();

  const route = useRouter();

  const handleDeleteModel = async () => {
    try {
      const res = await fetch(`https://api.bioup.ai/models/${modelId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });
      if (res) {
        toast({
          title: `✅ Modelo deletada`,
          duration: 3000,
        });
      }
      route.refresh();
      if(res.status === 401){
        signOut()
      }
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
