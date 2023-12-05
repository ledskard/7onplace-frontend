"use client";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useRouter, RedirectType } from "next/navigation";
import { ComponentProps, useEffect } from "react";
import { twMerge } from "tailwind-merge";

type ReturnToHomeButtonProps = ComponentProps<"button">;

export const ReturnToHomeButton = ({
  className,
  ...props
}: ReturnToHomeButtonProps) => {
  const route = useRouter();
  const handleClick = () => {
    
    const lastUrl = document.referrer;
  
    if (lastUrl) {
      route.back();
    } else {
      route.push("/");
    }

    console.log("aaaa", lastUrl)


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
