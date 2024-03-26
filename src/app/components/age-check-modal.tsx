"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const ageCheck = atomWithStorage<boolean>("ageCheck", false);

export const AgeCheckModal = () => {
  const [modalIsOpen, setModalIsOpen] = useAtom(ageCheck);

  const [mount, setMount] = useState<boolean>(false);
  const route = usePathname();

  const isLoginPage = route?.includes("login");

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount || isLoginPage) {
    return null;
  }

  return (
    <AlertDialog open={!modalIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Você tem mais de 18 anos ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Ao clicar em SIM, você concorda que é maior de 18 anos
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-center gap-4">
          <AlertDialogAction
            className="bg-red-main shadow-sm hover:bg-red-main/75"
            onClick={() => setModalIsOpen(true)}
          >
            Sim
          </AlertDialogAction>
          <Button className="border-red-main border bg-transparent text-black hover:bg-gray-100">
            <a href="https://www.7onplace.com.br/">Não</a>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
