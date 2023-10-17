export const getModelsByFilter = async (modelType: string) => {
  try {
    const modelsByFilter = await fetch(
      `https://alb7onsexy-1208292946.us-east-1.elb.amazonaws.com/models/?type=${modelType}`,
      { next: { revalidate: 1 } }
    );
    console.log(modelsByFilter)
    const modelsjson = await modelsByFilter.json();
    return modelsjson;
  } catch (error) {
    throw new Error("FILTER API ERROR");
  }
};
