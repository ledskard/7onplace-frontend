import React, { ComponentProps } from "react";
import { ListModelsCardsWithAdds } from "./list-models-cards-with-adds";
import { ModelsFilterProps } from "@/types/model/models-filter-props";
import { getModelsByFilter } from "@/types/model/get-models-by-filter";
import dbLocal from "../../../dblocal.json";

type ModelsListType = ComponentProps<"section"> & {
  modelType: string;
  query: string;
  models: Array<ModelsFilterProps>;
};

export async function ModelsList({
  modelType,
  className,
  query,
  models,
  ...props
}: ModelsListType) {
  const modelsByFilter = models.filter((model) => model.type === modelType);

  const filterModels = modelsByFilter.filter((mod) => {
    return query
      ? mod.username.toLowerCase().startsWith(query?.toLowerCase())
      : mod;
  });

  const orderModelsLikes = filterModels.sort((a, b) => {
    return b.likes - a.likes;
  });

  return (
    <>
      <ListModelsCardsWithAdds
        models={orderModelsLikes}
        query={query}
        className="hidden xl:grid"
      />
      <ListModelsCardsWithAdds
        models={orderModelsLikes}
        query={query}
        cardsPerAdd={4}
        className="grid xl:hidden"
      />
    </>
  );
}
