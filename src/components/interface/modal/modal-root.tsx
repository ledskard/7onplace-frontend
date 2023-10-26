import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ModalRootProps = ComponentProps<"div"> & {
  isOpenModal: boolean;
};

export const ModalRoot = ({
  isOpenModal,
  className,
  ...props
}: ModalRootProps) => {
  return (
    <div
      className={twMerge(
        "flex absolute w-full m-4 p-4 bg-red-main",
        isOpenModal && "flex",
        className
      )}
      {...props}
    />
  );
};
