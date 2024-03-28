"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationAppProps = {
  total_pages: number;
  actual_page: string;
  link: string;
};

export const PaginationApp = ({
  actual_page,
  total_pages,
  link,
}: PaginationAppProps) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const router = useRouter();
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "r" && e.ctrlKey) {
        e.preventDefault(); // Previne o comportamento padrão do Ctrl+R
        router.push("/"); // Redireciona para a URL desejada
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Limpeza do ouvinte de eventos ao desmontar o componente
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [router]);

  return (
    <Pagination className="my-10">
      <PaginationContent className="space-x-0 gap-0">
        {+actual_page > 3 && (
          <PaginationItem>
            <PaginationPrevious
              href={`${link}?page=${+actual_page - 1}&tab=${tab ?? "mulheres"}`}
            />
          </PaginationItem>
        )}

        {+actual_page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {+actual_page - 2 < total_pages && +actual_page - 2 > 0 && (
          <PaginationItem>
            <PaginationLink
              href={`${link}?page=${+actual_page - 2}&tab=${tab ?? "mulheres"}`}
            >
              {+actual_page - 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {+actual_page - 1 < total_pages && +actual_page - 1 > 0 && (
          <PaginationItem>
            <PaginationLink
              href={`${link}?page=${+actual_page - 1}&tab=${tab ?? "mulheres"}`}
            >
              {+actual_page - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            href={`${link}?page=${+actual_page}&tab=${tab ?? "mulheres"}`}
            isActive
          >
            {actual_page}
          </PaginationLink>
        </PaginationItem>

        {+actual_page < total_pages && (
          <PaginationItem>
            <PaginationLink
              href={`${link}?page=${+actual_page + 1}&tab=${tab ?? "mulheres"}`}
            >
              {+actual_page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {+actual_page + 2 < total_pages && (
          <PaginationItem>
            <PaginationLink
              href={`${link}?page=${+actual_page + 2}&tab=${tab ?? "mulheres"}`}
            >
              {+actual_page + 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {+actual_page + 2 < total_pages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {+actual_page + 1 < +total_pages && (
          <PaginationItem>
            <PaginationLink
              href={`${link}?page=${+total_pages}&tab=${tab ?? "mulheres"}`}
            >
              {+total_pages}
            </PaginationLink>
          </PaginationItem>
        )}

        {+actual_page < total_pages && (
          <PaginationItem>
            <PaginationNext
              href={`${link}?page=${+actual_page + 1}&tab=${tab ?? "mulheres"}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
