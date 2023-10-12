"use client";

import { Search } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ComponentProps, useCallback, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type SearchInputProps = ComponentProps<"div">;

export const SearchInput = ({ className, ...props }: SearchInputProps) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams as unknown as string);
      params.set(name, value);
      params.delete("page");

      return params.toString();
    },
    [searchParams]
  );

  const removeQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams as unknown as string);
      params.delete(name);

      return params.toString();
    },
    [searchParams]
  );

  // Teclas de atalho ESC para limpar o campo de busca
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push(pathname + "?" + removeQueryString("query"));
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [router, pathname, removeQueryString]);

  const handleSearchModels = () => {
    const value = searchRef.current?.value.toLowerCase();

    if (value) {
      router.push(pathname + "?" + createQueryString("query", value));
    } else {
      router.push(pathname + "?" + removeQueryString("query"));
    }
  };

  return (
    <div
      className={twMerge(
        "sm:flex hidden items-center justify-between border-2 border-red-main rounded md:rounded-md p-1",
        className
      )}
    >
      <input
        ref={searchRef}
        type="text"
        className="bg-transparent outline-none w-auto"
        placeholder="Buscar modelos"
        onKeyUp={handleSearchModels}
      />
      <button onClick={handleSearchModels}>
        <Search className="w-10/12" />
      </button>
    </div>
  );
};
