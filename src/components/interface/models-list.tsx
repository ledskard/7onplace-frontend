import React, { ComponentProps } from "react";
import { ListModelsCardsWithAdds } from "./list-models-cards-with-adds";
import { ModelsFilterProps } from "@/types/model/models-filter-props";
import { getModelsByFilter } from "@/types/model/get-models-by-filter";
import dbLocal from "../../../dblocal.json";

type ModelsListType = ComponentProps<"section"> & {
  modelType: string;
  query: string;
};

export async function ModelsList({
  modelType,
  className,
  query,
  ...props
}: ModelsListType) {
  const model: ModelsFilterProps[] = await getModelsByFilter(modelType);
  // const model = dbLocal

  const filterModels = model.filter((mod) => {
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
