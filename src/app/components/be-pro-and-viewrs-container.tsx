"use client";
import { Button } from "@/components/ui/button";
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
import { ComponentProps, useEffect, useState } from "react";
import { useWindowScroll } from "@uidotdev/usehooks";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { CheckIcon } from "lucide-react";

type BeProAndViewrsProps = ComponentProps<"button"> & {
  device: "mobile" | "desktop";
};

export const BeProAndViewrsContainer = ({
  device,
  className,
}: BeProAndViewrsProps) => {
  const useCustomScroll = () => {
    const [scrollY, setScrollY] = useState(window.scrollY);
  
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
  
    useEffect(() => {
      // Adiciona um ouvinte de evento ao scroll
      window.addEventListener('scroll', handleScroll);
  
      // Remove o ouvinte de evento ao desmontar o componente
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []); // A dependência vazia assegura que o efeito só é executado uma vez no montar do componente
  
    return scrollY;
  };
  
  const  y  = useCustomScroll();
  const scrollThreshold = 300;
  console.log(y)
  const shouldFix = y !== null && y !== undefined && y > scrollThreshold;

  return (
    <div
      className={cn(
        shouldFix && "fixed top-[52px] z-[49] w-full mx-auto left-0 bg-white items-center justify-center flex-col",
        device === "desktop"
          ? "xl:flex gap-x-6 hidden justify-between"
          : "xl:hidden block text-center",
        device === "desktop" && shouldFix && "xl:flex xl:flex-col items-center justify-center",
        className
      )}
    >
      <Viewrs.Container
        className={cn(
          "xl:flex flex mx-auto mb-4",
          device === "desktop" && shouldFix && "xl:flex mb-1"
        )}
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={cn(
              "mx-auto",
              device === "desktop"
                ? "max-w-fit px-10"
                : "px-4 md:px-6 lg:px-8 xl:px-10 mb-2 text-sm md:text-base lg:text-lg xl:text-xl max-w-fit"
            )}
          >
            Seja PRO (exclusivo para modelos)
          </Button>
        </DialogTrigger>
        <DialogContent className="md:h-fit max-h-full max-w-3xl overflow-x-hidden mx-auto p-0 py-4 m-0">
          <div className="grid md:grid-cols-2 grid-cols-1 mx-auto md:gap-8 order-2 md:order-1">
            <div className="mx-auto md:mr-auto self-end mt-2 space-y-2 z-[51]">
              <h5 className="text-2xl">
                Assinar o <b>Marketplace</b>
              </h5>
              <p className="text-lg">
                De{" "}
                <span className="font-bold text-red-main text-xl line-through">
                  R$ 197,00
                </span>
              </p>
              <div className="flex gap-2 items-center">
                <h5 className="text-red-main text-5xl font-bold">R$ 89,90</h5>
                <p className="text-xl">
                  Por <br />
                  Mês
                </p>
              </div>
              <p className="text-lg font-bold">
                (Valor promocional de Lançamento)
              </p>
              <a
                href="https://buy.stripe.com/4gw03V1A553q7WocMM"
                target="_blank"
                className="max-w-fit mx-auto text-center"
              >
                <button className="bg-green-700 text-white font-bold p-2 rounded-xl w-full text-xl mt-4">
                  Garantir Vantagens Agora
                </button>{" "}
              </a>
            </div>
            <div className="relative md:mt-0 mt-6">
              <Image
                width={400}
                height={400}
                src="/fundo-4-modal.png"
                alt="Fundo-4-Modal-Smartphone"
                className="max-w-[280px] md:absolute mx-auto bottom-0"
              />
            </div>
            <Image
              width={400}
              height={400}
              src="/fundo-3-modal.png"
              alt="Fundo-3-Modal-7onsexy"
              className="absolute left-0 top-0 sm:max-w-sm max-w-[100px] md:block hidden"
            />
            <Image
              width={400}
              height={400}
              src="/fundo-2-modal.png"
              alt="Fundo-2-Modal-7"
              className="absolute right-0 top-0 max-w-[300px] -z-[1] md:block hidden"
            />
          </div>
          <div className="order-1 md:order-2 md:mt-0 mt-7 bg-red-main p-4 md:pb-0 md:pr-0 rounded-2xl md:w-[80%] md:max-w-fit max-w-full h-fit mx-auto grid md:grid-cols-3 justify-center">
            <div className="col-span-2 h-fit pb-3">
              <Image
                width={400}
                height={400}
                src="/7onsexy-logo.png"
                alt="Fundo-1-Modal"
                className="max-w-[50px] mx-auto"
              />
              <div className="flex items-center justify-center flex-col gap-3 mt-6 text-white">
                <h5 className="font-medium drop-shadow text-6xl">EXCLUSIVO!</h5>
                <p className="text-lg">
                  Para <b>criador(a)</b> de conteúdo
                </p>
              </div>

              <button className="bg-white border-2 p-3 rounded-md border-slate-300 max-w-fit mt-5 mx-auto text-red-main  first-letter:capitalize">
                Assine o <span className="font-bold">PLANO PRO</span> e garanta
                os seguintes benefícios:
              </button>
              <ul className="mt-4 text-white space-y-2">
                <li className="flex gap-0.5 items-start">
                  <div className="bg-white rounded-full mr-1 flex justify-center items-center">
                    <CheckIcon className="w-5 h-5 font-bold text-emerald-500" />
                  </div>{" "}
                  <p>
                    Adicione link de{"  "}
                    <span className="font-bold">outras plataformas</span>, além
                    do Telegram VIP
                  </p>
                </li>

                <li className="flex items-start">
                  <div className="bg-white rounded-full mr-1 max-w-fit flex justify-center items-center">
                    <CheckIcon className="w-5 h-5 font-bold text-emerald-500" />
                  </div>{" "}
                  <p>
                    Adicione link das redes sociais{"  "}
                    <span className="font-bold">
                      (Instagram, Twitter, TikTok, WhatsApp)
                    </span>
                  </p>
                </li>

                <li className="flex items-start">
                  <div className="bg-white rounded-full mr-1 max-w-fit flex justify-center items-center">
                    <CheckIcon className="w-5 h-5 font-bold text-emerald-500" />
                  </div>{" "}
                  <p>
                    Adicione <span className="font-bold">GIF</span> ao seu
                    perfil
                  </p>
                </li>

                <li className="flex gap-0.5 items-center">
                  <div className="bg-white rounded-full mr-1 flex justify-center items-center">
                    <CheckIcon className="w-5 h-5 font-bold text-emerald-500" />
                  </div>{" "}
                  <p>
                    {" "}
                    Receba uma ⭐ em {"  "}
                    <span className="font-bold">destaque</span> na foto de capa
                  </p>
                </li>
              </ul>
            </div>
            <div className="relative h-full md:block hidden">
              <Image
                width={400}
                height={400}
                src="/modelo-modal.png"
                alt="Fundo-1-Modal"
                className="absolute right-0 md:block hidden -bottom-[1px]"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
