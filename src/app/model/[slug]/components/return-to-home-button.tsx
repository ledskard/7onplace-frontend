"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const ReturnToHomeButton = () => {
  const route = useRouter();
  return (
    <div
      onClick={() => route.back()}
      className="flex gap-4 absolute text-red-main top-16 left-7 md:left-10 items-center flex-wrap md:mb-0 mb-4 cursor-pointer"
    >
      <button className="rounded-full border border-red-main p-1">
        <ArrowLeft />
      </button>
      <p>Voltar a tela inical</p>
    </div>
  );
};
