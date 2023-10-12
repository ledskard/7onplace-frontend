import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Logo } from "./logo";
import { Navbar } from "./navigation/navbar";
import { Search } from "../search";
import { usePathname } from "next/navigation";

type HeaderProps = ComponentProps<"header">;

export const Header = ({ className, ...props }: HeaderProps) => {
  // const pathname = usePathname();
  // console.log(pathname);
  return (
    <header
      className={twMerge("bg-red-main w-full h-14", className)}
      {...props}
    >
      <Navbar>
        <Logo />
        {<Search.Input className="sm:hidden flex border-white bg-white" />}
      </Navbar>
    </header>
  );
};
