import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type NavbarProps = ComponentProps<"nav">;

export const Navbar = ({ className, ...props }: NavbarProps) => {
  return (
    <nav
      className={twMerge(
        "w-11/12 mx-auto h-full flex items-center justify-between",
        className
      )}
      {...props}
    />
  );
};
