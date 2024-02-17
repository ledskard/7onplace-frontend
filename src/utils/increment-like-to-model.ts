import revalidateTagAPI from "@/actions/revalidateTag";
import { blockedModelConfig } from "@/config/model-block.config";

export const incrementLike = async (slug: string) => {
  try {
    if (blockedModelConfig.map(model => model.toLowerCase()).includes(slug.toLowerCase())) {
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/models/${slug}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    revalidateTagAPI("modelsList");
    revalidateTagAPI("modelById");
    return await res.json();
  } catch (error) {
    throw new Error("API ERROR");
  }
};
