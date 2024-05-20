"use client";
import { useSession } from "next-auth/react";
import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

type CardModelsRootProps = ComponentProps<"div">;

export const CardModelActions = ({
  className,
  ...props
}: CardModelsRootProps) => {
  const { data: session } = useSession();

  return (
    <div
      className={twMerge(
        `sm:top-[2%] top-[3%] right-2 flex flex-col gap-2 justify-center items-center z-40 ${
          session ? "absolute" : "hidden"
        }`,
        className,
      )}
      {...props}
    />
  );
};
