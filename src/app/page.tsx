import { ModelsList } from "@/components/interface/models-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="w-10/12 mx-auto pt-5">
      <Tabs defaultValue="mulheres" className="w-[400px] bg-transparent">
        <TabsList>
          <TabsTrigger
            className="data-[state=active]:text-red-main data-[state=active]:bg-transparent data-[state=active]:border-t-2 data-[state=active]:border-red-main uppercase font-semibold"
            value="mulheres"
          >
            mulheres
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:text-red-main data-[state=active]:bg-transparent data-[state=active]:border-t-2 data-[state=active]:border-red-main uppercase font-semibold"
            value="casais"
          >
            casais
          </TabsTrigger>
          <TabsTrigger
            value="trans"
            className="data-[state=active]:text-red-main data-[state=active]:bg-transparent data-[state=active]:border-t-2 data-[state=active]:border-red-main uppercase font-semibold"
          >
            trans
          </TabsTrigger>
        </TabsList>
        <TabsContent value="mulheres">
          <ModelsList modelType="mulheres" />
        </TabsContent>
        <TabsContent value="casais">Change your password here.</TabsContent>
        <TabsContent value="trans">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
