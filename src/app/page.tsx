import { FlexDiv } from "@/components/interface/flex-div";
import { ModelsList } from "@/components/interface/models-list";
import { Search } from "@/components/interface/search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { Viewrs } from "./components/viewrs/index";

import { BeProAndViewrsContainer } from "./components/be-pro-and-viewrs-container";
import { ModelsListContainer } from "./models-list-container";
import { Card } from "@/components/interface/card-models";

type SearchProps = {
  searchParams: {
    query: string;
  };
};

export default function Home({ searchParams: { query } }: SearchProps) {
  return (
    <main className="w-11/12 mx-auto flex mb-5 gap-4 mt-36 xl:mt-24 max-w-[1920px]">
      <Tabs defaultValue="mulheres" className="w-full mx-auto">
        <TabsList className="xl:fixed xl:z-[50] mx-auto xl:max-w-[1900px] xl:w-[93%] xl:bg-[#f3f3f3] xl:top-14 xl:px-4 xl:translate-x-1/2 xl:right-1/2">
          <FlexDiv className="flex-wrap gap-0">
            <TabsTrigger value="mulheres">mulheres</TabsTrigger>
            <TabsTrigger value="casais">casais</TabsTrigger>
            <TabsTrigger value="trans">trans</TabsTrigger>
            <TabsTrigger value="homens">homens</TabsTrigger>
          </FlexDiv>
          <div className="items-center justify-center gap-8 max-w-fit w-full mx-auto xl:flex hidden">
            <BeProAndViewrsContainer device="desktop" className="py-2" />
          </div>
          <Search.Input className="sm:sticky hidden" />
        </TabsList>
        <Suspense fallback={<Card.Loading />}>
          <ModelsListContainer query={query} />
        </Suspense>
      </Tabs>
    </main>
  );
}
