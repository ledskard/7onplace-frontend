"use client";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const AgeCheckModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);
  const [mount, setMount] = useState<boolean>(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) {
    return null;
  }

  return (
    <AlertDialog open={modalIsOpen}>
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
            onClick={() => setModalIsOpen(false)}
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
