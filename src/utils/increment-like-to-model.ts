export const incrementLike = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/models/${slug}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // next: { revalidate: 6200 },/
      }
    );

    return await res.json();
  } catch (error) {
    throw new Error("API ERROR");
  }
};
