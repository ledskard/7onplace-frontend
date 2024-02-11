import revalidateTagAPI from "@/actions/revalidateTag";

export const incrementLike = async (slug: string) => {
  try {
    if(slug.toLowerCase() === "MorenaMineira".toLowerCase() || slug.toLowerCase() === "PollyannaPersch".toLowerCase() || slug.toLocaleLowerCase() === "maricasada"){
      return
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
