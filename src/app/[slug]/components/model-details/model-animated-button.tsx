"use client";
import { ComponentProps, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"button">;

export const ButtonAnimated = ({ ...props }: ButtonProps) => {
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  useEffect(() => {
    const toggleAnimation = () => {
      setIsAnimated(true);

      // Desativa a animação após 1.5 segundos
      setTimeout(() => {
        setIsAnimated(false);
      }, 1500);
    };

    // Inicia a animação quando o componente monta
    toggleAnimation();

    // Define um intervalo para repetir a animação a cada 1 minuto
    const intervalId = setInterval(() => {
      toggleAnimation();
    }, 6000);

    // Limpa o intervalo quando o componente é desmontado para evitar vazamentos de memória
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <button
      className={twMerge(
        `w-full h-10 uppercase text-white font-semibold bg-red-main rounded md:rounded-md ${
          isAnimated && "animate-telegram"
        }`
      )}
      {...props}
    />
  );
};
