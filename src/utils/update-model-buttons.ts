import { ModelButtonsProps } from "@/app/[slug]/components/model-details/model-social-media-buttons";
import { ModelsFilterProps } from "@/types/model/models-filter-props";
import { getServerSession } from "next-auth";

type UpdateModelButtonsProps = {
  buttons: ModelButtonsProps[];
  slug: string;
};

export const updateModelButtons = async ({
  buttons,
  slug,
}: UpdateModelButtonsProps): Promise<ModelsFilterProps> => {
  const session = await getServerSession();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_URL}/models/${slug}`,
    {
      next: { revalidate: 1, tags: ["modelById"] },
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.user.token,
      },
      body: JSON.stringify(buttons),
    }
  );

  return await res.json();
};
