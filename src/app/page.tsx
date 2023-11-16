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
    <main className="w-11/12 mx-auto lg:pt-5 flex mb-5 gap-4">
      <Tabs defaultValue="mulheres" className="w-full mx-auto">
        <BeProAndViewrsContainer device="mobile" />

        <TabsList>
          <FlexDiv className="flex-wrap gap-0">
            <TabsTrigger value="mulheres">mulheres</TabsTrigger>
            <TabsTrigger value="casais">casais</TabsTrigger>
            <TabsTrigger value="trans">trans</TabsTrigger>
            <TabsTrigger value="homens">homens</TabsTrigger>
          </FlexDiv>
          <div className="items-center justify-center gap-8 max-w-fit w-full mx-auto xl:flex hidden">
            {/* <Viewrs.Container className="bg-yellow-500" /> */}
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
