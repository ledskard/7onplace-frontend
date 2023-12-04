import { ModelsFilterProps } from "@/types/model/models-filter-props";

export const getDataById = async (slug: string): Promise<ModelsFilterProps> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}/models/${slug}`,
    { next: { revalidate: 1 } }
  );
  return await res.json();
};
