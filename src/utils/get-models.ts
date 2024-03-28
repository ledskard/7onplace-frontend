import { getServerSession } from "next-auth";

import { ModelsFilterProps } from "@/types/model/models-filter-props";

type GetModelsProps = {
  page: string;
  type: string;
  query: string;
};

export const getModels = async ({
  page,
  type,
  query,
}: GetModelsProps): Promise<ModelsFilterProps> => {
  const session = await getServerSession();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/models?page=${page}&type=${type}&filter=${query}`,
      {
        next: { revalidate: 1, tags: ["modelsList"] },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session?.user.token,
        },
      },
    );
    return await res.json();
  } catch (error) {
    throw new Error("API Error to call models route");
  }
};
