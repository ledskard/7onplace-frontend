export const incrementLike = async (slug: string) => {
  try {
    const res = await fetch(
      `http://ec2-54-161-22-227.compute-1.amazonaws.com:8080/models/${slug}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 1 },
      }
    );

    return await res.json();
  } catch (error) {
    throw new Error("API ERROR");
  }
};
