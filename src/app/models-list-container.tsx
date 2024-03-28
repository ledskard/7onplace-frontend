import { ComponentProps } from "react";

import { ModelsList } from "@/components/interface/models-list";
import { PaginationApp } from "@/components/interface/pagination-app";
import { TabsContent } from "@/components/ui/tabs";

import { ModelsFilterProps } from "@/types/model/models-filter-props";
import { getModels } from "@/utils/get-models";

type ModelsListContainerProps = ComponentProps<"div"> & {
  query: string;
  page?: string;
  type?: string;
};

export const ModelsListContainer = async ({
  query,
  page,
  type,
}: ModelsListContainerProps) => {
  const models: ModelsFilterProps = await getModels({
    page: page ?? "1",
    type: type ?? "mulheres",
    query: query ?? "",
  });

  return (
    <>
      <TabsContent value="mulheres">
        <ModelsList modelType="mulheres" models={models.data} query={query} />
      </TabsContent>

      <TabsContent value="casais">
        <ModelsList models={models.data} modelType="casais" query={query} />
      </TabsContent>

      <TabsContent value="trans">
        <ModelsList models={models.data} modelType="trans" query={query} />
      </TabsContent>
      <TabsContent value="homens">
        <ModelsList models={models.data} modelType="homens" query={query} />
      </TabsContent>
      {models.totalPages > 1 && (
        <PaginationApp
          actual_page={page ?? "1"}
          link="/"
          total_pages={models.totalPages ?? 1}
        />
      )}
    </>
  );
};
