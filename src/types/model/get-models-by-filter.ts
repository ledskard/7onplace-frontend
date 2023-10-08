export const getModelsByFilter = async (modelType: string) => {
  try {
    const modelsByFilter = await fetch(
      `http://ec2-54-161-22-227.compute-1.amazonaws.com:8080/models/?type=${modelType}`,
      { next: { revalidate: 1 } }
    );
    const modelsjson = await modelsByFilter.json();
    return modelsjson;
  } catch (error) {
    throw new Error("FILTER API ERROR");
  }
};
