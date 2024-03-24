import { getModelsMostViewedByWeek } from "@/utils/get-models-most-viewed-by-week";

import { MostViewedModelsSlider } from "./most-viewed-models-slider";

export const MostViewedModelsWrapper = async () => {
  const models = await getModelsMostViewedByWeek();

  return <MostViewedModelsSlider models={models} />;
};
