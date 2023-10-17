export const incrementLike = async (slug: string) => {
  try {
    const res = await fetch(
      `https://alb7onsexy-1208292946.us-east-1.elb.amazonaws.com/models/${slug}`,
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
