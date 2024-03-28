"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ComponentProps, useEffect, useRef } from "react";

import { QueryParams } from "@/utils/query-params";
import { Search } from "lucide-react";
import { twMerge } from "tailwind-merge";

type SearchInputProps = ComponentProps<"div">;

export const SearchInput = ({ className }: SearchInputProps) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const query = searchParams.get("query");

  // Teclas de atalho ESC para limpar o campo de busca
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push("/");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [router, pathname]);

  const handleSearchModels = () => {
    const value = searchRef.current?.value.toLowerCase();

    if (value) {
      const url = QueryParams.baseUrl(pathname)
        .query({
          query: "tab",
          value: tab ?? "mulheres",
        })
        .query({
          query: "query",
          value: value ?? "",
        })
        .value();

      router.push(url);
    } else {
      router.push("/");
    }
  };

  return (
    <div
      className={twMerge(
        "sm:flex hidden md:ml-4 items-center justify-between border-2 border-red-main rounded md:rounded-md p-1 max-w-[70%]",
        className,
      )}
    >
      <input
        ref={searchRef}
        type="text"
        className="bg-transparent outline-none max-w-[80%]"
        placeholder="Buscar modelos"
        defaultValue={query || undefined}
        onKeyUp={handleSearchModels}
      />
      <button onClick={handleSearchModels} aria-label="Buscar modelos">
        <Search className="w-10/12" />
      </button>
    </div>
  );
};
