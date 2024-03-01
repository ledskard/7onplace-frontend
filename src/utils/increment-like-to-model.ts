import revalidateTagAPI from "@/actions/revalidateTag";
import { blockedModelConfig } from "@/config/model-block.config";

interface LastCallTimestamps {
  [slug: string]: number;
}


const lastCallTimestamps: LastCallTimestamps = {};

export const incrementLike = async (slug: string) => {
  const currentTimestamp = Date.now();
  const lastTimestamp = lastCallTimestamps[slug];
  const fiveMinutes = 5 * 60 * 1000;

  if (blockedModelConfig.map(model => model.toLowerCase()).includes(slug.toLowerCase()) ||
    (lastTimestamp && currentTimestamp - lastTimestamp < fiveMinutes)) {
    return;
  }

  try {
    const currentTimestamp = Date.now();
    const lastTimestamp = lastCallTimestamps[slug];
    const fiveMinutes = 5 * 60 * 1000;

    if (blockedModelConfig.map(model => model.toLowerCase()).includes(slug.toLowerCase()) ||
      (lastTimestamp && currentTimestamp - lastTimestamp < fiveMinutes)) {
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

    lastCallTimestamps[slug] = currentTimestamp;

    revalidateTagAPI("modelsList");
    revalidateTagAPI("modelById");
    return await res.json();
  } catch (error) {
    throw new Error("API ERROR");
  }
};