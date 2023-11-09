import { FlexDiv } from "@/components/interface/flex-div";
import { ModelsList } from "@/components/interface/models-list";
import { Search } from "@/components/interface/search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { Viewrs } from "./components/viewrs/index";
import { Card } from "@/components/interface/card-models";
import { DialogProButton } from "./components/be-pro/be-pro";

type SearchProps = {
  searchParams: {
    query: string;
  };
};

export default function Home({ searchParams: { query } }: SearchProps) {
  return (
    <main className="w-11/12 mx-auto lg:pt-5 flex mb-5 gap-4">
      <Tabs defaultValue="mulheres" className="w-full mx-auto p-0">
        <Viewrs.Container className="lg:hidden flex mx-auto my-4" />
        <TabsList>
          <FlexDiv className="flex-wrap gap-0">
            <TabsTrigger value="mulheres">mulheres</TabsTrigger>
            <TabsTrigger value="casais">casais</TabsTrigger>
            <TabsTrigger value="trans">trans</TabsTrigger>
            <TabsTrigger value="homens">homens</TabsTrigger>
          </FlexDiv>
          <Viewrs.Container className="lg:flex hidden" />
          <DialogProButton />
          <Search.Input className="sm:sticky hidden" />
        </TabsList>

        <TabsContent value="mulheres">
          <Suspense fallback={<Card.Loading />}>
            <ModelsList modelType="mulheres" query={query} />
          </Suspense>
        </TabsContent>

        <TabsContent value="casais">
          <Suspense fallback={<Card.Loading />}>
            <ModelsList modelType="casais" query={query} />
          </Suspense>
        </TabsContent>

        <TabsContent value="trans">
          <Suspense fallback={<Card.Loading />}>
            <ModelsList modelType="trans" query={query} />
          </Suspense>
        </TabsContent>
        <TabsContent value="homens">
          <Suspense fallback={<Card.Loading />}>
            <ModelsList modelType="homens" query={query} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  );
}
