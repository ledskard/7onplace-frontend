"use client";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Logo } from "./logo";
import { Navbar } from "./navigation/navbar";
import { Search } from "../search";
import { useSelectedLayoutSegment } from "next/navigation";

type HeaderProps = ComponentProps<"header">;

export const Header = ({ className, ...props }: HeaderProps) => {
  const pathName = useSelectedLayoutSegment();
  return (
    <header
      className={twMerge("bg-red-main w-full h-14", className)}
      {...props}
    >
      <Navbar>
        <Logo />
        {pathName === null && (
          <Search.Input className="sm:hidden flex border-white bg-white" />
        )}
      </Navbar>
    </header>
  );
};
