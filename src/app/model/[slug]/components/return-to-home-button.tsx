"use client";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ReturnToHomeButtonProps = ComponentProps<"button">;

export const ReturnToHomeButton = ({
  className,
  ...props
}: ReturnToHomeButtonProps) => {
  const route = useRouter();
  return (
    <button
      className={twMerge(
        "sm:p-1 flex gap-4 text-white items-center my-auto",
        className
      )}
      onClick={() => route.back()}
      {...props}
    >
      <span className="sm:border-2 sm:border-red-main rounded-full p-1">
        <ChevronLeft className="w-9 h-9 sm:hidden block pt-2" />
        <ArrowLeft className="w-7 h-7 sm:block hidden" />
      </span>
      <p className="sm:block hidden">Voltar a tela inical</p>
    </button>
  );
};
