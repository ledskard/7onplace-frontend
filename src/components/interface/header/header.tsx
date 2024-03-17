"use client";
import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Logo } from "./logo";
import { Navbar } from "./navigation/navbar";
import { Search } from "../search";
import { useSelectedLayoutSegment } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button-main";
import { GoSignOut } from "react-icons/go";
import { ReturnToHomeButton } from "@/app/[slug]/components/return-to-home-button";
import { BeProAndViewrsContainer } from "@/app/components/be-pro-and-viewrs-container";

type HeaderProps = ComponentProps<"header">;

export const Header = ({ className, ...props }: HeaderProps) => {
  const pathName = useSelectedLayoutSegment();
  const { data: session } = useSession({
    required: false,
  });

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <>
      <header
        className={twMerge(
          "bg-red-main w-full h-14 p-1 fixed top-0 z-[49]",
          className
        )}
        {...props}
      >
        <Navbar className="max-w-[1920px] px-6 w-full gap-3">
          {pathName === null ? (
            <Logo href={"https://7onplace.com.br"} />
          ) : (
            <ReturnToHomeButton className="sm:hidden block" />
          )}
          {pathName !== null && (
            <Logo href={"https://7onplace.com.br"} className="sm:block hidden" />
          )}
          {pathName === null && (
            <Search.Input className="sm:hidden flex border-white bg-white" />
          )}  
          {session && (
            <Button className="w-fit text-xl" onClick={handleSignOut}>
              <GoSignOut />
            </Button>
          )}
        </Navbar>
      </header>

      <div className={`${pathName === null ? "fixed xl:fixed block": "hidden"} fixed top-14 w-full z-[49] bg-[#f3f3f3] py-2`}>
        <BeProAndViewrsContainer device="mobile" />
      </div>
    </>
  );
};
