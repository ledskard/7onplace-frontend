import { ModelsFilterProps } from "@/types/model/models-filter-props";
import { getServerSession } from "next-auth";

export const getModels = async (): Promise<Array<ModelsFilterProps>> => {
  const session = await getServerSession();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/models/`, {
      next: { revalidate: 1 },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.user.token,
      },
    });
    return await res.json();
  } catch (error) {
    throw new Error("API Error to call models route");
  }
};
