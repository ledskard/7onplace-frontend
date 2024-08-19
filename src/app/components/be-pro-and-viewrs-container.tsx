"use client";
import { Button } from "@/components/ui/button-main";
import { Viewrs } from "./viewrs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { useWindowScroll } from "@uidotdev/usehooks";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

type BeProAndViewrsProps = ComponentProps<"button"> & {
  device: "mobile" | "desktop";
};

export const BeProAndViewrsContainer = ({
  device,
  className,
}: BeProAndViewrsProps) => {
  const [{ y }] = useWindowScroll();

  return (
    <div
      className={cn(
        "flex items-center justify-center", // Centralização para ambos os dispositivos
        device === "desktop" ? "xl:flex hidden" : "xl:hidden flex",
        className
      )}
    >
      <Viewrs.Container className="flex items-center justify-center" />
      {/* <Dialog>
        <DialogTrigger asChild>
          <Link href="https://t.me/seteonplace_bot" passHref target="_blank" className={cn(
            "mx-auto",
            device === "desktop"
              ? "max-w-fit px-10"
              : "px-4 md:px-6 lg:px-8 xl:px-10 mb-2 text-sm md:text-base lg:text-lg xl:text-xl max-w-fit"
          )}>
            <Button
            
              className={cn(
                "mx-auto",
                device === "desktop"
                  ? "max-w-fit px-10"
                  : "px-4 md:px-6 lg:px-8 xl:px-10 mb-2 text-sm md:text-base lg:text-lg xl:text-xl max-w-fit"
              )}
            >
              Seja PREMIUM (exclusivo para modelos)
            </Button>
          </Link>
        </DialogTrigger>
      </Dialog> */}
    </div >
  );
};