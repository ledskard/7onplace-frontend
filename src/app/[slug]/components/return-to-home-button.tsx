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
  const isFromExternalSite = document.referrer && !document.referrer.includes(window.location.origin);

  console.log(isFromExternalSite)
  const handleClick = () => {
    if (isFromExternalSite) {
      route.back();
    } else {
      route.push('/');
    }
  };
  return (
    <button
      className={twMerge(
        "sm:p-1 flex gap-4 text-white items-center my-auto md:h-auto h-full",
        className
      )}
      onClick={handleClick}
      {...props}

    >
      <ArrowLeft className="w-9 h-9 sm:block hidden sm:border-2 sm:border-red-main rounded-full p-1" />

      <ChevronLeft className="w-9 h-9 sm:hidden block" />
      <p className="sm:block hidden">Voltar a tela inical</p>
    </button>
    
  );
};
