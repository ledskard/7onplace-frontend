import Link from "next/link";
import { Suspense } from "react";

import { BeProAndViewrsContainer } from "./components/be-pro-and-viewrs-container";
import { MostViewedModelsWrapper } from "./components/most-viewed-models/most-viewed-models-wrapper";
import { Card } from "@/components/interface/card-models";
import { FlexDiv } from "@/components/interface/flex-div";
import { Search } from "@/components/interface/search";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ChatbotIframe from "./chatbot";
import { ModelsListContainer } from "./models-list-container";

type SearchProps = {
  searchParams: {
    query: string;
    page?: string;
    tab?: string;
  };
};

export default function Home({
  searchParams: { query, page, tab },
}: SearchProps) {
  return (
    <main className="mx-auto flex mb-5 gap-4 mt-20 xl:mt-16 max-w-[1900px] w-full sm:px-6 px-2 md:py-10 xl:py-3">
      <ChatbotIframe />
      <Tabs
        defaultValue="mulheres"
        className="w-full mx-auto py-2 mt-20 sm:mt-0"
      >
        <TabsList className="xl:fixed xl:z-[50] mx-auto xl:max-w-[1920px] xl:w-[100%] px-4 xl:bg-[#f3f3f3] xl:top-14 xl:translate-x-1/2 xl:right-1/2">
          <FlexDiv className="gap-0 flex-wrap gap-y-3">
            <Link href={`/?page=1&tab=mulheres`}>
              <TabsTrigger value="mulheres">mulheres</TabsTrigger>
            </Link>
            <Link href={`/?page=1&tab=casais`}>
              <TabsTrigger value="casais">casais</TabsTrigger>
            </Link>
            <Link href={`/?page=1&tab=trans`}>
              <TabsTrigger value="trans">trans</TabsTrigger>
            </Link>
            <Link href={`/?page=1&tab=homens`}>
              <TabsTrigger value="homens">homens</TabsTrigger>
            </Link>
          </FlexDiv>

          <div className="items-center justify-center gap-8 max-w-fit w-full mx-auto xl:flex hidden">
            <BeProAndViewrsContainer device="desktop" className="py-2" />
          </div>

          <Search.Input className="sm:sticky hidden" />
        </TabsList>

        <Suspense fallback={<Card.Loading />}>
          <MostViewedModelsWrapper />
        </Suspense>

        <Suspense fallback={<Card.Loading />}>
          <ModelsListContainer query={query} page={page} type={tab} />
        </Suspense>
      </Tabs>
    </main>
  );
}
