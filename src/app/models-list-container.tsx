import { ModelsList } from "@/components/interface/models-list";
import { TabsContent } from "@/components/ui/tabs";
import { ModelsFilterProps } from "@/types/model/models-filter-props";
import { getModels } from "@/utils/get-models";
import { ComponentProps } from "react";

type ModelsListContainerProps = ComponentProps<"div"> & {
  query: string;
};

export const ModelsListContainer = async ({
  query,
}: ModelsListContainerProps) => {
  const models: ModelsFilterProps[] = await getModels();

  return (
    <>
      <TabsContent value="mulheres">
        <ModelsList modelType="mulheres" models={models} query={query} />
      </TabsContent>

      <TabsContent value="casais">
        <ModelsList models={models} modelType="casais" query={query} />
      </TabsContent>

      <TabsContent value="trans">
        <ModelsList models={models} modelType="trans" query={query} />
      </TabsContent>
      <TabsContent value="homens">
        <ModelsList models={models} modelType="homens" query={query} />
      </TabsContent>
    </>
  );
};
