import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Logo } from "./logo";
import { Navbar } from "./navigation/navbar";

type HeaderProps = ComponentProps<"header">;

export const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <header
      className={twMerge(
        "bg-red-main w-full h-14",
        className
      )}
      {...props}
    >
      <Navbar>
        <Logo />
      </Navbar>
    </header>
  );
};
