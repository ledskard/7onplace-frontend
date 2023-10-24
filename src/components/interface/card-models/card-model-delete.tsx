"use client";
import { useSession } from "next-auth/react";
import { ComponentProps } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

type CardModelsRootProps = ComponentProps<"div"> & {
  modelId: string;
};

export const CardDelete = ({
  className,
  modelId,
  ...props
}: CardModelsRootProps) => {
  const { data: session } = useSession();
  const handleDeleteModel = async () => {
    const res = await fetch(`https://api.bioup.ai/models/${modelId}`, {
      method: "DELETE",
    });
    const result = await res.json();
  };

  return (
    <div
      className={twMerge(
        `flex sm:top-[2%] top-[3%] right-2 text-red-main bg-white shadow rounded-full w-8 h-8 justify-center items-center p-1 hover:bg-red-main hover:text-white duration-300 z-40 cursor-pointer ${
          session ? "absolute" : "hidden"
        }`,
        className
      )}
      onClick={handleDeleteModel}
      {...props}
    >
      <BsFillTrash3Fill />
    </div>
  );
};
