export const getModelsByFilter = async (modelType: string) => {
  try {
    const modelsByFilter = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/models/?type=${modelType}`,
      { next: { revalidate: 1 } },
    );
    const modelsjson = await modelsByFilter.json();
    return modelsjson;
  } catch (error) {
    throw new Error("FILTER API ERROR");
  }
};
