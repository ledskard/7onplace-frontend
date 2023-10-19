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

const word =
  "A<br/>N<br/>U<br/>N<br/>C<br/>I<br/>E<br/> <br/>A<br/>Q<br/>U<br/>I<br/>";

export default function Home({ searchParams: { query } }: SearchProps) {
  return (
    <main className="sm:w-11/12 w-11/12 mx-auto pt-5 flex mb-5 gap-4">
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
      <Adverts.Root>
        <div className="md:block hidden text-2xl font-bold">
          <h1 dangerouslySetInnerHTML={{ __html: word }}></h1>
        </div>
        <div className="md:hidden block font-semibold text-lg">
          ANUNCIE AQUI
        </div>
      </Adverts.Root>
      {/* </Adverts.ExternalLink> */}
    </main>
  );
}
