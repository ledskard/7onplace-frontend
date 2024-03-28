import React, { ComponentProps } from "react";

import { ModelsProps } from "@/types/model/models-filter-props";

import { ListModelsCardsWithAdds } from "./list-models-cards-with-adds";

type ModelsListType = ComponentProps<"section"> & {
  modelType: string;
  query: string;
  models: Array<ModelsProps>;
};

export async function ModelsList({
  modelType,
  className,
  query,
  models,
  ...props
}: ModelsListType) {
  // const modelsByFilter = models.filter((model) => model.type === modelType);

  // const filterModels = modelsByFilter.filter((mod) => {
  //   return query
  //     ? mod.username.toLowerCase().includes(query?.toLowerCase())
  //     : mod;
  // });

  // const orderModelsLikes = filterModels.sort((a, b) => {
  //   return b.likes - a.likes;
  // });

  return (
    <>
      <ListModelsCardsWithAdds
        models={models}
        query={query}
        className="hidden xl:grid"
      />
      <ListModelsCardsWithAdds
        models={models}
        query={query}
        cardsPerAdd={4}
        className="grid xl:hidden"
      />
    </>
  );
}
