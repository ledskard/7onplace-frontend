// import { getServerSession } from "next-auth";

import { ModelsProps } from "@/types/model/models-filter-props";

export const getModelsMostViewedByWeek = async (): Promise<
  Array<ModelsProps>
> => {
  // const session = await getServerSession();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/models/likes/weekly`,
      {
        next: { revalidate: 1, tags: ["modelsByWeek"] },
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + session?.user.token,
        },
      },
    );
    return await res.json();
  } catch (error) {
    throw new Error("API Error to call models most viewed weekly");
  }
};
