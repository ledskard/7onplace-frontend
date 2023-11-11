import { FlexDiv } from "@/components/interface/flex-div";
import { ModelsList } from "@/components/interface/models-list";
import { Search } from "@/components/interface/search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { Viewrs } from "./components/viewrs/index";
import { Card } from "@/components/interface/card-models";
import { DialogProButton } from "./components/be-pro/be-pro";
import { Button } from "@/components/ui/button";

type SearchProps = {
  searchParams: {
    query: string;
  };
};

export default function Home({ searchParams: { query } }: SearchProps) {
  return (
    <main className="w-11/12 mx-auto lg:pt-5 flex mb-5 gap-4">
      <Tabs defaultValue="mulheres" className="w-full mx-auto">
        <Viewrs.Container className="xl:hidden flex mx-auto mb-4" />
        <a
          href="https://buy.stripe.com/6oEbJc9RC2Ti54Q6oo"
          target="_blank"
          className="xl:hidden block text-center max-w-fit mx-auto"
        >
          <Button className="px-4 md:px-6 lg:px-8 xl:px-10 mx-auto mb-6 text-sm md:text-base lg:text-lg xl:text-xl">
            Seja PRO (exclusivo para modelos)
          </Button>
        </a>

        <TabsList>
          <FlexDiv className="flex-wrap gap-0">
            <TabsTrigger value="mulheres">mulheres</TabsTrigger>
            <TabsTrigger value="casais">casais</TabsTrigger>
            <TabsTrigger value="trans">trans</TabsTrigger>
            <TabsTrigger value="homens">homens</TabsTrigger>
          </FlexDiv>
          <div className="items-center justify-center gap-8 max-w-fit w-full mx-auto xl:flex hidden">
            <Viewrs.Container />
            <a href="https://buy.stripe.com/6oEbJc9RC2Ti54Q6oo" target="_blank">
              <Button className="max-w-fit px-10 ">
                Seja Pro (exclusivo para modelos)
              </Button>
            </a>
          </div>
          {/* <DialogProButton /> */}
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
