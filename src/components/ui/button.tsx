import Link from "next/link";
import { Children, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  href?: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

export const Button = ({
  className,
  href = "",
  children,
  onClick,
}: ButtonProps) => {
  const isExternal = href?.includes("https");
  const Comp = href === "" ? "button" : isExternal ? "a" : Link;

  return (
    <Comp
      href={href}
      className={twMerge(
        "flex items-center justify-center w-full h-10 uppercase text-white font-semibold bg-red-main",
        className
      )}
      onClick={onClick}
      target={isExternal ? "_blank" : ""}
    >
      {children}
    </Comp>
  );
};
