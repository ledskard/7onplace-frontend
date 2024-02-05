import revalidateTagAPI from "@/actions/revalidateTag";
import { ModelButtonsProps } from "@/app/[slug]/components/model-details/model-social-media-buttons";
import { ModelsFilterProps } from "@/types/model/models-filter-props";
import { signOut } from "next-auth/react";

type UpdateModelButtonsProps = {
  buttons: ModelButtonsProps[];
  slug: string;
  token: string
};

export const updateModelButtons = async ({
  buttons,
  slug,
  token
}: UpdateModelButtonsProps): Promise<ModelsFilterProps> => {

  const
    res = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/models/${slug}`,
      {
        next: { revalidate: 1 },
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ buttons }),
      }
    );
  const result = await res.json()
  if (result.status === 401) {
    signOut()
  }
  revalidateTagAPI("modelById");


  return await res.json();
};
