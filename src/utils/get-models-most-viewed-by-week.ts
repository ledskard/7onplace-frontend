import { ModelsProps } from "@/types/model/models-filter-props";

export const getModelsMostViewedByWeek = async (): Promise<
  Array<ModelsProps>
> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/models/likes/weekly`,
      {
        next: { revalidate: 1, tags: ["modelsByWeek"] },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return await res.json();
  } catch (error) {
    console.log(error)
    throw new Error("API Error to call models most viewed weekly");
  }
};
