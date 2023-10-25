import { FlexDiv } from "@/components/interface/flex-div";
import { ModelsList } from "@/components/interface/models-list";
import { Search } from "@/components/interface/search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Adverts } from "./components/advert";

type SearchProps = {
  searchParams: {
    query: string;
  };
};

export default function Home({ searchParams: { query } }: SearchProps) {
  return (
    <main className="sm:w-10/12 w-10/12 mx-auto pt-5 flex mb-5 gap-4">
      <Tabs defaultValue="mulheres" className="w-full">
        <TabsList>
          <FlexDiv className="vsm:flex-wrap gap-0">
            <TabsTrigger value="mulheres">mulheres</TabsTrigger>
            <TabsTrigger value="casais">casais</TabsTrigger>
            <TabsTrigger value="trans">trans</TabsTrigger>
            <TabsTrigger value="homens">homens</TabsTrigger>
          </FlexDiv>
          <Search.Input className="sm:sticky hidden" />
        </TabsList>

        <TabsContent value="mulheres">
          <ModelsList modelType="mulheres" query={query} />
        </TabsContent>

        <TabsContent value="casais">
          <ModelsList modelType="casais" query={query} />
        </TabsContent>

        <TabsContent value="trans">
          <ModelsList modelType="trans" query={query} />
        </TabsContent>
        <TabsContent value="homens">
          <ModelsList modelType="homens" query={query} />
        </TabsContent>
      </Tabs>
      {/* <Adverts.ExternalLink
        href="https://wa.me//5554999090675?text=Tenho%20interesse%20em%20anunciar%20no%7onsexy"
        target="_blank"
      > */}
<<<<<<< Updated upstream
      <Adverts.Root>Teste de anuncio</Adverts.Root>
=======
      
>>>>>>> Stashed changes
      {/* </Adverts.ExternalLink> */}
    </main>
  );
}
