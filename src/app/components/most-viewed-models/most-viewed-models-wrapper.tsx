import { getModels } from "@/utils/get-models";

import { MostViewedModelsSlider } from "./most-viewed-models-slider";

export const MostViewedModelsWrapper = async () => {
  const models = await getModels();

  const randomIndex1 = Math.floor(Math.random() * 100);

  const randomIndex2 = Math.floor(Math.random() * 100) + 1;

  const startIndex = Math.min(randomIndex1, randomIndex2);
  const endIndex = Math.max(randomIndex1, randomIndex2);

  const randomModels = models.slice(startIndex, endIndex);

  return <MostViewedModelsSlider models={randomModels} />;
};
